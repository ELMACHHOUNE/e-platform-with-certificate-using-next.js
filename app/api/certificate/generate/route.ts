import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";
import os from "os";

const execFileAsync = promisify(execFile);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { studentFullName, durationF, formationDate, certificateId, instructorName, academyName } = data;

    if (!studentFullName) {
      return NextResponse.json({ error: "studentFullName is required" }, { status: 400 });
    }

    const templatePath = path.join(
      process.cwd(),
      "public",
      "certificates",
      "PDF",
      "certificate.pdf"
    );
    const scriptPath = path.join(process.cwd(), "scripts", "update_certificate.py");
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "cert-"));

    try {
      const redactedPdf = path.join(tmpDir, "output.pdf");
      const redactList = path.join(tmpDir, "replacements.json");

      await fs.writeFile(
        redactList,
        JSON.stringify([
          { old: "studentFullName", new: studentFullName },
          { old: "durationF", new: durationF || "" },
          { old: "formationDate", new: formationDate || "" },
          { old: "instructorName", new: instructorName || "" },
          { old: "academyName", new: academyName || "" },
        ]),
        "utf-8"
      );

      await execFileAsync("python", [scriptPath, templatePath, redactedPdf, redactList]);

      const pdfBuffer = await fs.readFile(redactedPdf);
      let pdfBytes = new Uint8Array(pdfBuffer);

      if (certificateId) {
        const pdfLib = await import("pdf-lib");
        const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);
        const page = pdfDoc.getPages()[0]!;
        const font = await pdfDoc.embedFont(pdfLib.StandardFonts.Helvetica);
        page.drawText(certificateId, {
          x: 200,
          y: 200,
          size: 35,
          font,
          color: pdfLib.rgb(0.094, 0.239, 0.376),
        });
        pdfBytes = new Uint8Array(await pdfDoc.save());
      }

      await fs.rm(tmpDir, { recursive: true, force: true });

      const safeName = studentFullName.replace(/[^a-zA-Z0-9]/g, "_");
      return new NextResponse(Buffer.from(pdfBytes), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${safeName}_certificate.pdf"`,
        },
      });
    } catch (err) {
      await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
      throw err;
    }
  } catch (error) {
    console.error("Certificate generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";
import os from "os";

const execFileAsync = promisify(execFile);

interface TextDef {
  text: string;
  x: number;
  y: number;
  size: number;
}

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
      // Step 1: Redact old placeholder texts using PyMuPDF
      const redactedPdf = path.join(tmpDir, "redacted.pdf");
      const redactList = path.join(tmpDir, "redact.json");

      await fs.writeFile(
        redactList,
        JSON.stringify([
          { old: "studentFullName" },
          { old: "durationF" },
          { old: "formationDate" },
          { old: "instructorName" },
          { old: "academyName" },
        ]),
        "utf-8"
      );

      await execFileAsync("python", [scriptPath, templatePath, redactedPdf, redactList]);

      // Step 2: Draw all texts at exact positions using pdf-lib
      const pdfBuffer = await fs.readFile(redactedPdf);
      const pdfLib = await import("pdf-lib");
      const pdfDoc = await pdfLib.PDFDocument.load(new Uint8Array(pdfBuffer));
      const page = pdfDoc.getPages()[0]!;
      const font = await pdfDoc.embedFont(pdfLib.StandardFonts.Helvetica);
      const color = pdfLib.rgb(0.094, 0.239, 0.376);

      const fields: TextDef[] = [
        { text: studentFullName, x: 1078, y: 1445, size: 184 },
        { text: durationF || "", x: 1071, y: 738, size: 55 },
        { text: formationDate || "", x: 1513, y: 735, size: 60 },
        { text: instructorName || "", x: 1169, y: 232, size: 55 },
        { text: academyName || "", x: 2082, y: 237, size: 55 },
        { text: certificateId || "", x: 200, y: 200, size: 35 },
      ];

      for (const f of fields) {
        if (!f.text) continue;
        page.drawText(f.text, { x: f.x, y: f.y, size: f.size, font, color });
      }

      const pdfBytes = new Uint8Array(await pdfDoc.save());

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

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
      const outputPdf = path.join(tmpDir, "output.pdf");
      const textsList = path.join(tmpDir, "texts.json");

      await fs.writeFile(
        textsList,
        JSON.stringify([
          { old: "studentFullName", new: studentFullName },
          { old: "durationF", new: durationF || "" },
          { old: "formationDate", new: formationDate || "" },
          { old: "certiﬁcateId", new: certificateId || "" },
          { old: "instructorName", new: instructorName || "" },
          { old: "academyName", new: academyName || "" },
        ]),
        "utf-8"
      );

      await execFileAsync("python", [scriptPath, templatePath, outputPdf, textsList]);

      const pdfBuffer = await fs.readFile(outputPdf);

      await fs.rm(tmpDir, { recursive: true, force: true });

      const safeName = studentFullName.replace(/[^a-zA-Z0-9]/g, "_");
      return new NextResponse(Buffer.from(pdfBuffer), {
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

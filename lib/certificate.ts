import type { CertificateData } from "@/types/certificate";

const CERTIFICATE_TEMPLATE_PATH = "/certificates/PDF/certificate.pdf";

interface FieldDef {
  name: keyof CertificateData;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
}

const FIELDS: FieldDef[] = [
  { name: "studentFullName", x: 600, y: 1345, width: 2000, height: 200, fontSize: 184 },
  { name: "durationF", x: 600, y: 900, width: 1500, height: 60, fontSize: 55 },
  { name: "formationDate", x: 1500, y: 725, width: 800, height: 60, fontSize: 55 },
  { name: "certificateId", x: 200, y: 375, width: 600, height: 50, fontSize: 40 },
  { name: "instructorName", x: 1800, y: 375, width: 600, height: 60, fontSize: 50 },
  { name: "academyName", x: 800, y: 1960, width: 1500, height: 80, fontSize: 60 },
];

export async function generateCertificate(
  data: CertificateData
): Promise<Uint8Array> {
  const pdfLib = await import("pdf-lib");

  const templateResponse = await fetch(CERTIFICATE_TEMPLATE_PATH);

  if (!templateResponse.ok) {
    throw new Error(
      `Failed to load certificate template. HTTP ${templateResponse.status}: ${templateResponse.statusText}`
    );
  }

  const templateBytes = await templateResponse.arrayBuffer();
  const pdfDoc = await pdfLib.PDFDocument.load(templateBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0]!;
  const form = pdfDoc.getForm();

  const textColor = pdfLib.rgb(0.063, 0.223, 0.359);

  for (const def of FIELDS) {
    let field;
    let isNew = false;

    try {
      field = form.getTextField(def.name);
    } catch {
      field = form.createTextField(def.name);
      isNew = true;
    }

    if (isNew) {
      field.addToPage(firstPage, {
        x: def.x,
        y: def.y,
        width: def.width,
        height: def.height,
        textColor,
        borderWidth: 0,
      });
    }

    field.setFontSize(def.fontSize);
    field.setText(data[def.name]);
    field.enableReadOnly();
  }

  form.flatten();
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

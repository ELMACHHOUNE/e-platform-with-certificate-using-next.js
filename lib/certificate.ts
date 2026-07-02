import type { CertificateData } from "@/types/certificate";

const CERTIFICATE_TEMPLATE_PATH = "/certificates/PDF/certificate.pdf";

const PDF_FORM_FIELDS: (keyof CertificateData)[] = [
  "studentFullName",
  "durationF",
  "formationDate",
  "certificateId",
  "instructorName",
  "academyName",
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

  const form = pdfDoc.getForm();

  for (const fieldName of PDF_FORM_FIELDS) {
    const field = form.getTextField(fieldName);
    if (!field) {
      throw new Error(
        `Certificate template is missing required form field: "${fieldName}". ` +
          `Ensure the PDF template contains a text field with this exact name.`
      );
    }
    field.setText(data[fieldName]);
  }

  form.flatten();

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

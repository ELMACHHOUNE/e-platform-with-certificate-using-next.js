import type { CertificateData } from "@/types/certificate";

const API_ENDPOINT = "/api/certificate/generate";

export async function generateCertificate(
  data: CertificateData
): Promise<Uint8Array> {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `Server error: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

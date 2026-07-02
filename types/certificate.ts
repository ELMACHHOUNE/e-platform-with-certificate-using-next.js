export interface CertificateData {
  studentFullName: string;
  durationF: string;
  formationDate: string;
  certificateId: string;
  instructorName: string;
  academyName: string;
}

export interface CertificateGenerationResult {
  success: true;
  fileName: string;
}

export interface CertificateError {
  success: false;
  error: string;
}

export type CertificateResponse = CertificateGenerationResult | CertificateError;

"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { CertificateData } from "@/types/certificate";
import { generateCertificate } from "@/lib/certificate";
import { createCertificateFileName, downloadPdf } from "@/utils/generateCertificate";

interface UseGenerateCertificateReturn {
  generate: (data: CertificateData) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

export function useGenerateCertificate(): UseGenerateCertificateReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (data: CertificateData) => {
    setIsGenerating(true);
    setError(null);

    try {
      const pdfBytes = await generateCertificate(data);

      const fileName = createCertificateFileName(data.studentFullName);

      downloadPdf(pdfBytes, fileName);

      toast.success("Certificate generated successfully.");
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "An unexpected error occurred while generating the certificate.";

      setError(message);
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generate, isGenerating, error };
}

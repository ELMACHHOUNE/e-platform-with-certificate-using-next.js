"use client";

import { Award } from "lucide-react";
import type { CertificateData } from "@/types/certificate";
import { useGenerateCertificate } from "@/hooks/useGenerateCertificate";
import { CertificatePreviewCard } from "@/components/certificate/CertificatePreviewCard";
import { CertificateLoading } from "@/components/certificate/CertificateLoading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CertificateData;
}

export function CertificateDialog({
  open,
  onOpenChange,
  data,
}: CertificateDialogProps) {
  const { generate, isGenerating } = useGenerateCertificate();

  const handleGenerate = async () => {
    await generate(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Award className="size-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Export Certificate</DialogTitle>
              <DialogDescription>
                Generate an official certificate for {data.studentFullName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          {isGenerating ? (
            <CertificateLoading />
          ) : (
            <CertificatePreviewCard data={data} />
          )}
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Award className="size-4" />
                Generate Certificate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

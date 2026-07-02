"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import type { CertificateData } from "@/types/certificate";
import { CertificateDialog } from "@/components/certificate/CertificateDialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExportCertificateButtonProps {
  data: CertificateData;
}

export function ExportCertificateButton({
  data,
}: ExportCertificateButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="gap-1.5 rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary active:scale-95 transition-all duration-200"
            >
              <Award className="size-3.5" />
              <span className="hidden sm:inline">Export Certificate</span>
            </Button>
          }
        />
        <TooltipContent side="left">
          Generate certificate for this student
        </TooltipContent>
      </Tooltip>

      <CertificateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={data}
      />
    </>
  );
}

"use client";

import type { ReactNode } from "react";
import type { CertificateData } from "@/types/certificate";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  Clock,
  Hash,
  GraduationCap,
  Building2,
} from "lucide-react";

interface CertificatePreviewCardProps {
  data: CertificateData;
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/5">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <div className="truncate text-sm font-medium text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}

export function CertificatePreviewCard({ data }: CertificatePreviewCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-none">
      <div className="bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent px-5 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <GraduationCap className="size-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Certificate Preview
            </h3>
            <p className="text-xs text-muted-foreground">
              Review the information before generating
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <DetailRow
            icon={User}
            label="Student Name"
            value={data.studentFullName}
          />
          <DetailRow
            icon={User}
            label="Instructor"
            value={data.instructorName}
          />
          <DetailRow
            icon={Building2}
            label="Academy"
            value={data.academyName}
          />
          <DetailRow
            icon={Clock}
            label="Duration"
            value={data.durationF}
          />
          <DetailRow
            icon={Calendar}
            label="Formation Date"
            value={data.formationDate}
          />
          <DetailRow
            icon={Hash}
            label="Certificate ID"
            value={
              <div className="flex items-center gap-2">
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {data.certificateId}
                </code>
                <Badge variant="outline" className="text-[10px] leading-none">
                  Verified
                </Badge>
              </div>
            }
          />
        </div>

        <Separator className="my-4" />

        <div className="rounded-lg bg-success/5 border border-success/10 px-4 py-3">
          <p className="text-xs text-success-foreground/80 leading-relaxed">
            This certificate will be generated using the official template. The
            design preserves the original Adobe Illustrator layout with your
            information filled in automatically.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

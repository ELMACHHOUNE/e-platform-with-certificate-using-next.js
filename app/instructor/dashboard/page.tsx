"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import type { CertificateData } from "@/types/certificate";
import { ExportCertificateButton } from "@/components/certificate/ExportCertificateButton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap } from "lucide-react";

const SAMPLE_STUDENTS: (CertificateData & { email: string; progress: number })[] = [
  {
    studentFullName: "Mohamed El Machhoune",
    email: "mohamed@example.com",
    durationF: "120 Hours",
    formationDate: "2026-06-15",
    certificateId: "CERT-2026-001",
    instructorName: "Dr. Sarah Johnson",
    academyName: "E-Platform Academy",
    progress: 100,
  },
  {
    studentFullName: "Alice Martin",
    email: "alice@example.com",
    durationF: "80 Hours",
    formationDate: "2026-06-10",
    certificateId: "CERT-2026-002",
    instructorName: "Dr. Sarah Johnson",
    academyName: "E-Platform Academy",
    progress: 100,
  },
  {
    studentFullName: "James Wilson",
    email: "james@example.com",
    durationF: "60 Hours",
    formationDate: "2026-05-28",
    certificateId: "CERT-2026-003",
    instructorName: "Dr. Sarah Johnson",
    academyName: "E-Platform Academy",
    progress: 85,
  },
  {
    studentFullName: "Emma Thompson",
    email: "emma@example.com",
    durationF: "100 Hours",
    formationDate: "2026-06-20",
    certificateId: "CERT-2026-004",
    instructorName: "Dr. Sarah Johnson",
    academyName: "E-Platform Academy",
    progress: 92,
  },
  {
    studentFullName: "Liam Chen",
    email: "liam@example.com",
    durationF: "90 Hours",
    formationDate: "2026-06-18",
    certificateId: "CERT-2026-005",
    instructorName: "Dr. Sarah Johnson",
    academyName: "E-Platform Academy",
    progress: 78,
  },
];

const columnHelper = createColumnHelper<(typeof SAMPLE_STUDENTS)[number]>();

const columns = [
  columnHelper.accessor("studentFullName", {
    header: "Student Name",
    cell: (info) => (
      <span className="font-medium">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => (
      <span className="text-muted-foreground">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("durationF", {
    header: "Duration",
  }),
  columnHelper.accessor("formationDate", {
    header: "Completion Date",
  }),
  columnHelper.accessor("progress", {
    header: "Progress",
    cell: (info) => {
      const value = info.getValue();
      return (
        <Badge variant={value >= 100 ? "default" : "secondary"}>
          {value}%
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Certificate",
    cell: (info) => {
      const student = info.row.original;
      if (student.progress < 100) {
        return (
          <span className="text-xs text-muted-foreground">
            In progress
          </span>
        );
      }
      return (
        <ExportCertificateButton
          data={{
            studentFullName: student.studentFullName,
            durationF: student.durationF,
            formationDate: student.formationDate,
            certificateId: student.certificateId,
            instructorName: student.instructorName,
            academyName: student.academyName,
          }}
        />
      );
    },
  }),
];

export default function InstructorDashboardPage() {
  const [data] = useState(SAMPLE_STUDENTS);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-background-custom">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="size-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-dark">Instructor Dashboard</h1>
            <p className="text-sm text-gray-custom">
              Manage your students and generate certificates
            </p>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Users className="size-4 text-primary" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="size-4 text-accent" />
                Certificates Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {data.filter((s) => s.progress >= 100).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="size-4 text-success" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">
                {Math.round(
                  (data.filter((s) => s.progress >= 100).length / data.length) *
                    100
                )}
                %
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

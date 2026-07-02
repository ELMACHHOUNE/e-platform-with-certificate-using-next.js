"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import type { CertificateData } from "@/types/certificate";
import type { StudentData, StatsData } from "@/types/api";
import { useAuth } from "@/lib/AuthContext";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, GraduationCap, BookOpen, TrendingUp, LogOut } from "lucide-react";

const columnHelper = createColumnHelper<StudentData>();

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
      const certData: CertificateData = {
        studentFullName: student.studentFullName,
        durationF: student.durationF,
        formationDate: student.formationDate,
        certificateId: student.certificateId,
        instructorName: student.instructorName,
        academyName: student.academyName,
      };
      return <ExportCertificateButton data={certData} />;
    },
  }),
];

const statCards: {
  key: keyof StatsData;
  label: string;
  icon: typeof Users;
  color: string;
  suffix?: string;
}[] = [
  { key: "totalStudents", label: "Total Students", icon: Users, color: "text-primary" },
  { key: "studentsWithCertificate", label: "Certificates Available", icon: GraduationCap, color: "text-accent" },
  { key: "completionRate", label: "Completion Rate", icon: TrendingUp, color: "text-success", suffix: "%" },
  { key: "totalCourses", label: "Active Courses", icon: BookOpen, color: "text-secondary" },
];

export default function InstructorDashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchData() {
      try {
        const [studentsRes, statsRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/stats"),
        ]);

        if (studentsRes.ok) {
          const data = await studentsRes.json();
          setStudents(data.students);
        }
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, authLoading, router]);

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-custom">
        <div className="flex flex-col items-center gap-3">
          <span className="inline-block size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-custom">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap className="size-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark">
                Instructor Dashboard
              </h1>
              <p className="text-sm text-gray-custom">
                Welcome back, {user.name}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="gap-2"
          >
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium">
                  <stat.icon className={`size-4 ${stat.color}`} />
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold">
                    {stats
                      ? `${stats[stat.key]}${stat.suffix ?? ""}`
                      : "—"}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="space-y-3 p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

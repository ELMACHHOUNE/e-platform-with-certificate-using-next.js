import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Student } from "@/lib/models/Student";
import { Course } from "@/lib/models/Course";
import { Instructor } from "@/lib/models/Instructor";

export async function GET() {
  try {
    await connectDB();

    const [totalStudents, studentsWithCertificate, totalCourses, totalInstructors] =
      await Promise.all([
        Student.countDocuments(),
        Student.countDocuments({ progress: 100 }),
        Course.countDocuments(),
        Instructor.countDocuments(),
      ]);

    const completionRate =
      totalStudents > 0
        ? Math.round((studentsWithCertificate / totalStudents) * 100)
        : 0;

    return NextResponse.json({
      stats: {
        totalStudents,
        studentsWithCertificate,
        totalCourses,
        totalInstructors,
        completionRate,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch stats";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

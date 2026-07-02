import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/lib/models/Course";

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find().sort({ students: -1 }).lean();

    return NextResponse.json({ courses });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch courses";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

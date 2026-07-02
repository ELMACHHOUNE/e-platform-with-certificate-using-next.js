import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Instructor } from "@/lib/models/Instructor";

export async function GET() {
  try {
    await connectDB();

    const instructors = await Instructor.find().sort({ name: 1 }).lean();

    return NextResponse.json({ instructors });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch instructors";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

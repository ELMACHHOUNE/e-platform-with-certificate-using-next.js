import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Student } from "@/lib/models/Student";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const search = searchParams.get("search") ?? "";
    const instructor = searchParams.get("instructor") ?? "";

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { studentFullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { certificateId: { $regex: search, $options: "i" } },
      ];
    }
    if (instructor) {
      query.instructorName = { $regex: instructor, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      Student.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Student.countDocuments(query),
    ]);

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch students";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const existing = await Student.findOne({ certificateId: body.certificateId });
    if (existing) {
      return NextResponse.json(
        { error: "A student with this certificate ID already exists" },
        { status: 409 }
      );
    }

    const student = await Student.create(body);

    return NextResponse.json({ student }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create student";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

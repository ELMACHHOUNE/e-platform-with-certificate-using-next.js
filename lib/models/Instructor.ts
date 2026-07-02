import { Schema, model, models } from "mongoose";

export interface IInstructor {
  _id?: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  studentsCount: number;
  coursesCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const InstructorSchema = new Schema<IInstructor>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    bio: { type: String, required: true, trim: true },
    avatar: { type: String, default: "" },
    studentsCount: { type: Number, default: 0 },
    coursesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Instructor =
  models.Instructor || model<IInstructor>("Instructor", InstructorSchema);

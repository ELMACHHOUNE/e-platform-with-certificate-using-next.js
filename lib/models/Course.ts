import { Schema, model, models } from "mongoose";

export interface ICourse {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  students: number;
  instructorName: string;
  color: string;
  iconColor: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    students: { type: Number, required: true, default: 0 },
    instructorName: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    iconColor: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Course =
  models.Course || model<ICourse>("Course", CourseSchema);

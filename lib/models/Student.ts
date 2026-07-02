import { Schema, model, models } from "mongoose";

export interface IStudent {
  _id?: string;
  studentFullName: string;
  email: string;
  durationF: string;
  formationDate: string;
  certificateId: string;
  instructorName: string;
  academyName: string;
  progress: number;
  course: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    studentFullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    durationF: { type: String, required: true, trim: true },
    formationDate: { type: String, required: true, trim: true },
    certificateId: { type: String, required: true, unique: true, trim: true },
    instructorName: { type: String, required: true, trim: true },
    academyName: { type: String, required: true, trim: true },
    progress: { type: Number, required: true, min: 0, max: 100, default: 0 },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true }
);

export const Student =
  models.Student || model<IStudent>("Student", StudentSchema);

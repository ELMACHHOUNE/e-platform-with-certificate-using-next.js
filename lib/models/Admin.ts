import { Schema, model, models } from "mongoose";

export interface IAdmin {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

export const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);

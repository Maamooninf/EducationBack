import mongoose from "mongoose";
import { Role } from "./role.interface";

export const roleSchema = new mongoose.Schema<Role>(
  {
    prival: { type: String },
  },
  {
    timestamps: true,
  }
);

export const RoleModel = mongoose.model<Role>("Role", roleSchema);

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "./user.interface";

export const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String },

    email: { type: String, unique: true },

    password: { type: String },
    socketId: { type: String },

    IsConfirmed: { type: Boolean, default: false },

    Isonline: { type: Boolean, default: false },

    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    languages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Language" }],
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

export const UserModel = mongoose.model<User>("User", userSchema);

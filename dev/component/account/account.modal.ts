import mongoose from "mongoose";
import { Account } from "./account.interface";
const AccountSchema = new mongoose.Schema<Account>(
  {
    supername: { type: String },
    email: { type: String },
    profilePic: { type: String },
    expertise: [{ type: mongoose.Schema.Types.ObjectId, ref: "Language" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
const AccountModel = mongoose.model<Account>("Account", AccountSchema);
export { AccountModel };

import mongoose from "mongoose";
export interface Role {
  _id?: mongoose.Schema.Types.ObjectId;
  prival: string;
}

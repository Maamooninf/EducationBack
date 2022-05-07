import mongoose from "mongoose";

export interface Account {
  supername: string;
  profilePic?: string;
  email: string;
  expertise: Array<mongoose.Schema.Types.ObjectId>;
}

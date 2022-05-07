import mongoose from "mongoose";

export interface Message {
  content: string;
  author: mongoose.Types.ObjectId;
  conversation: mongoose.Types.ObjectId;
}

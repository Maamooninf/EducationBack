import mongoose from "mongoose";
import { Message } from "./message.interface";
const MessageSchema = new mongoose.Schema<Message>(
  {
    content: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  },
  { timestamps: true }
);
const MessageModel = mongoose.model<Message>("Message", MessageSchema);
export { MessageModel };

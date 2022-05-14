import mongoose from "mongoose";
import { Conversation } from "./conversatio.interface";
const ConversationtSchema = new mongoose.Schema<Conversation>(
  {
    title: { type: String },
    picture: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    language: { type: mongoose.Schema.Types.ObjectId, ref: "Language" },
  },
  { timestamps: true }
);
const ConversationModel = mongoose.model<Conversation>(
  "Conversation",
  ConversationtSchema
);
export { ConversationModel };

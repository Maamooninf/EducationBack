import mongoose from "mongoose";

export interface Conversation {
  title: string;
  picture?: string;
  members: Array<mongoose.Types.ObjectId>;
  language: mongoose.Types.ObjectId;
}

export interface Conver {
  _id: string;
  title: string;
  picture?: string;
  members: Array<string>;
  language: string;
  lastmessage?: string;
  isjoined?: number;
}

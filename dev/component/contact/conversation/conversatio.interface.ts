import mongoose from "mongoose";
export interface LastMessage {
  content: string;
  createdAt: Date;
}
export interface Conversation {
  title: string;
  picture?: string;
  members: Array<mongoose.Types.ObjectId>;
  language: mongoose.Types.ObjectId;
  lastmessage?: LastMessage;
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
export interface ConverOfUser {
  _id: string;
  lastmessage: string;
  title: string;
  isjoined: number;
}

import mongoose from "mongoose";

export interface Slide {
  _id?: mongoose.Types.ObjectId;
  content: string;
  kind: string;
}

export interface Lecture {
  _id?: mongoose.Types.ObjectId;
  title: string;
  slides?: Slide[];
  language?: mongoose.Types.ObjectId;
}

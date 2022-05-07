import mongoose from "mongoose";
import { Question } from "../question/question.interface";

export interface Language {
  _id?: mongoose.Types.ObjectId;
  lang: string;
  description: string;
  questiones?: Question[];
}

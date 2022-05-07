import mongoose from "mongoose";
import { Lecture } from "./lecture.interface";

export const lectureSchema = new mongoose.Schema<Lecture>(
  {
    title: {
      type: String,
    },
    slides: [
      {
        content: {
          type: String,
        },
        kind: {
          type: String,
        },
      },
    ],

    language: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Language",
    },
  },
  {
    timestamps: true,
  }
);

export const LectureModel = mongoose.model<Lecture>("Lecture", lectureSchema);

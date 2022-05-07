import mongoose from "mongoose";
import { Language } from "./lang.interface";

const langSchema = new mongoose.Schema<Language>(
  {
    lang: { type: String },
    description: { type: String },
    questiones: [
      {
        description: { type: String },
        options: [
          {
            description: { type: String },
            isTrue: { type: Boolean },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const LangModel = mongoose.model<Language>("Language", langSchema);

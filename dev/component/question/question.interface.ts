import mongoose from "mongoose";

export interface Option {
  description: string;
  isTrue: boolean;
}
export interface Question {
  description: string;
  options: Option[];
}

import { IsArray, IsString, Validate } from "class-validator";
import mongoose from "mongoose";
// import { ObjectIdCustom } from "../../account/dto/objectIdDec";
import { Language } from "../lang.interface";
export class LangDto implements Language {
  @IsString()
  lang: string;
  @IsString()
  description: string;
}

export interface LangRes {
  _id?: mongoose.Types.ObjectId;
  lang: string;
  description: string;
}

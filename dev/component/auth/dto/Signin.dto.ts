import { IsString } from "class-validator";
import mongoose from "mongoose";

export class SignInDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
export interface SignInRes {
  accesstoken: string;
  refreshtoken: string;
  isUser?: boolean;
  isAdmin?: boolean;
  isEmploye?: boolean;
  _id?: mongoose.Types.ObjectId;
}

import {
  IsString,
  IsOptional,
  IsEmail,
  IsArray,
  Validate,
} from "class-validator";
import mongoose from "mongoose";
import { Account } from "../account.interface";
import { AccountMatchEmail } from "./emailExist";
import { ObjectIdCustom } from "./objectIdDec";
export class AccountDto implements Account {
  @IsString()
  supername: string;
  @IsOptional()
  profilePic: string;
  @IsEmail()
  @Validate(AccountMatchEmail, ["email"])
  email: string;
  @IsArray()
  @Validate(ObjectIdCustom, ["expertise"])
  expertise: Array<mongoose.Schema.Types.ObjectId>;
}

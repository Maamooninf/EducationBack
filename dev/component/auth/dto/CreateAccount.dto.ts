import {
  IsArray,
  IsEmail,
  IsString,
  Length,
  Matches,
  Validate,
} from "class-validator";
import mongoose from "mongoose";
import { ObjectIdCustom } from "../../account/dto/objectIdDec";
import { CustomMatchEmail, CustomMatchPasswords } from "./CustomDeca";

export class AccountsDto {
  @IsString()
  @Length(3, 7, {
    message: "required length  between 3->7 ",
  })
  name: string;
  @IsEmail(
    {},
    {
      message: "Enter a valid email",
    }
  )
  @Validate(CustomMatchEmail, ["email"])
  email: string;
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$&*]).*$/,
    {
      message: "weak password",
    }
  )
  password: string;
  @Validate(CustomMatchPasswords, ["password"])
  confirmpassword: string;
  @IsArray()
  @Validate(ObjectIdCustom)
  roles: mongoose.Schema.Types.ObjectId[];
  @IsArray()
  @Validate(ObjectIdCustom, ["language"])
  languages: mongoose.Schema.Types.ObjectId[];
}

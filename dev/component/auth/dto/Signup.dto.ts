import { IsEmail, IsString, Matches, Validate, Length } from "class-validator";
import { CustomMatchEmail, CustomMatchPasswords } from "./CustomDeca";

export class SignUpDto {
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
}

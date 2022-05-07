import express from "express";
import { TryCatch } from "../../errorhand/TryCatch";
import { AccessMiddle, RefreshMiddle } from "../../share/authen.middleware";
import { AdminMiddle } from "../../share/author.middlware";
import { dtoValidationMiddleware } from "../../share/valdationReq";
import {
  ConfirmEmail,
  CreateAccount,
  RefreshGen,
  Signin,
  Signup,
} from "./auth.service";
import { AccountsDto } from "./dto/CreateAccount.dto";
import { SignInDto } from "./dto/Signin.dto";
import { SignUpDto } from "./dto/Signup.dto";

export class AuthController {
  public path = "/auth";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(
      "/signin",
      dtoValidationMiddleware(SignInDto),
      TryCatch(Signin)
    );
    this.router.post(
      "/signup",
      dtoValidationMiddleware(SignUpDto),
      TryCatch(Signup)
    );
    this.router.post(
      "/createAccount",
      //
      [AccessMiddle, AdminMiddle, dtoValidationMiddleware(AccountsDto)],
      TryCatch(CreateAccount)
    );
    this.router.get("/confEmail/:token", TryCatch(ConfirmEmail));
    this.router.get("/refreshgen", RefreshMiddle, TryCatch(RefreshGen));
  }
}

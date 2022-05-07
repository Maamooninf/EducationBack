import express from "express";
import { TryCatch } from "../../errorhand/TryCatch";
import { AccessMiddle } from "../../share/authen.middleware";
import { AdminMiddle } from "../../share/author.middlware";
import { dtoValidationMiddleware } from "../../share/valdationReq";
import { CreateAccount, GetTeacher } from "./account.service";
import { AccountDto } from "./dto/account.dto";
export class AccountController {
  public path = "/account";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post(
      "/create",

      [AccessMiddle, AdminMiddle, dtoValidationMiddleware(AccountDto)],
      TryCatch(CreateAccount)
    );
    this.router.get(
      "/:lang",
      [AccessMiddle, AdminMiddle],
      TryCatch(GetTeacher)
    );
  }
}

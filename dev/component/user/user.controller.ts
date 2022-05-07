import express from "express";
import { TryCatch } from "../../errorhand/TryCatch";
import { AccessMiddle } from "../../share/authen.middleware";
import { AdminMiddle } from "../../share/author.middlware";
import { GetAllUsers, GetUsers } from "./user.service";
export class UserController {
  public path = "/user";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get(
      "/numbers",
      [AccessMiddle, AdminMiddle],
      TryCatch(GetAllUsers)
    );
    this.router.get("/allusers", TryCatch(GetUsers));
  }
}

import express from "express";
import { TryCatch } from "../../errorhand/TryCatch";
import { AccessMiddle } from "../../share/authen.middleware";
import { AdminMiddle } from "../../share/author.middlware";
// import { dtoValidationMiddleware } from "../../share/valdationReq";
// import { RoleDto } from "./dto/role.Dto";
import { GetRoles } from "./role.service";
export class RoleController {
  public path = "/role";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.get("/rols", [AccessMiddle, AdminMiddle], TryCatch(GetRoles));
  }
}

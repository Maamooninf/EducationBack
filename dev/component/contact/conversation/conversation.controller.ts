import express from "express";
import { TryCatch } from "../../../errorhand/TryCatch";
import { AccessMiddle } from "../../../share/authen.middleware";
import { dtoValidationMiddleware } from "../../../share/valdationReq";
import {
  CreateConv,
  DeleteUserFromConv,
  GetConvOfLang,
  GetConvs,
  GetUserInConv,
  InsertUserToConv,
} from "./conversation.service";
import { ConversationDto } from "./dto/conversation.dto";
export class ConversationController {
  public path = "/conversation";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post(
      "/createConv",
      dtoValidationMiddleware(ConversationDto),
      TryCatch(CreateConv)
    );
    this.router.get("/all", [AccessMiddle], TryCatch(GetConvs));
    this.router.get("/:convId", [AccessMiddle], TryCatch(GetUserInConv));
    this.router.get(
      "/certain/:langId",
      [AccessMiddle],
      TryCatch(GetConvOfLang)
    );
    this.router.put(
      "/adduser/:convId",
      [AccessMiddle],
      TryCatch(InsertUserToConv)
    );
    this.router.delete(
      "/removeuser/:convId",
      [AccessMiddle],
      TryCatch(DeleteUserFromConv)
    );
  }
}

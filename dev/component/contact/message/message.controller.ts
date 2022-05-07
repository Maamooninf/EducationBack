import express from "express";
import { TryCatch } from "../../../errorhand/TryCatch";
import { dtoValidationMiddleware } from "../../../share/valdationReq";
import { MessageDto } from "./dto/message.dto";
import { CreateMessage, GetMessages } from "./message.service";

export class MessageController {
  public path = "/message";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post(
      "/createMessage",
      dtoValidationMiddleware(MessageDto),
      TryCatch(CreateMessage)
    );
    this.router.get("/all/:convId", TryCatch(GetMessages));
  }
}

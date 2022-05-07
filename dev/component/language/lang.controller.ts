import express from "express";
import { TryCatch } from "../../errorhand/TryCatch";
import { dtoValidationMiddleware } from "../../share/valdationReq";
import { LangDto } from "./dto/lang.dto";
import { CreateLang, GetLangs } from "./lang.service";

export class LangController {
  public path = "/lang";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post(
      "/createLang",
      dtoValidationMiddleware(LangDto),
      TryCatch(CreateLang)
    );
    this.router.get("/all", TryCatch(GetLangs));
  }
}

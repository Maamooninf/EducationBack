import express from "express";
import { TryCatch } from "../../errorhand/TryCatch";
// import { AccessMiddle } from "../../share/authen.middleware";
import {
  AnswerQuestione,
  CreateQuestion,
  GetQuestiones,
} from "./question.service";
import { dtoValidationMiddleware } from "../../share/valdationReq";
import { QuestionDto } from "./dto/question.dto";
import { AdminMiddle } from "../../share/author.middlware";
import { AccessMiddle } from "../../share/authen.middleware";
// import { SlideDto } from "./dto/slide.dto";
// import { CreateSlide } from "./slide.service";

export class QuestionController {
  public path = "/question";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post(
      "/create/:langId",
      [AccessMiddle, AdminMiddle, dtoValidationMiddleware(QuestionDto)],
      TryCatch(CreateQuestion)
    );
    this.router.get("/all/:langId", TryCatch(GetQuestiones));
    this.router.get("/answer/:langId/:quesId", TryCatch(AnswerQuestione));
  }
}

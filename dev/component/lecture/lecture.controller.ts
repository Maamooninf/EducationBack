import express from "express";
import { TryCatch } from "../../errorhand/TryCatch";
import { AccessMiddle } from "../../share/authen.middleware";
import { AdminMiddle } from "../../share/author.middlware";
import { dtoValidationMiddleware } from "../../share/valdationReq";
import { LectureDto } from "./dto/lecture.dto";
import { CreateLecture, GetLectures, GetSlides } from "./lecture.service";
export class LectureController {
  public path = "/lecture";
  public router = express.Router();
  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post(
      "/create",
      [AccessMiddle, AdminMiddle, dtoValidationMiddleware(LectureDto)],
      TryCatch(CreateLecture)
    );
    this.router.get("/lan/:langId", AccessMiddle, TryCatch(GetLectures));
    this.router.get("/slid/:lecId", [AccessMiddle], TryCatch(GetSlides));
  }
}

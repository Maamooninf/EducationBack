import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Lecture } from "./lecture.interface";
import { LectureModel } from "./lecture.modal";

export const CreateLecture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lecture = await LectureModel.create(req.body);
  const result: Lecture = {
    _id: lecture._id,
    title: lecture.title,
  };
  return res.status(200).send(result);
};
export const GetLectures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let langId = new mongoose.Types.ObjectId(req.params.langId);
  const lecs = await LectureModel.aggregate([
    {
      $match: {
        language: langId,
      },
    },

    {
      $project: { _id: 1, title: 1 },
    },
  ]);
  return res.status(200).send(lecs);
};
export const GetSlides = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let lecId = new mongoose.Types.ObjectId(req.params.lecId);
  const lecs = await LectureModel.aggregate([
    {
      $match: {
        _id: lecId,
      },
    },
    {
      $project: {
        slides: 1,
      },
    },
  ]);
  return res.status(200).send(lecs);
};

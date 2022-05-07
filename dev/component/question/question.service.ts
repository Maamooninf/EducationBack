import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { LangModel } from "../language/lang.modal";
export const CreateQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await LangModel.findOneAndUpdate(
    { _id: req.params.langId },
    {
      $push: {
        questiones: {
          description: req.body.description,
          options: req.body.options,
        },
      },
    }
  );
  return res.status(200).send("Question Created Successfully");
};

export const GetQuestiones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // await QuestionModel.create(req.body);
  let langId = req.params.langId;
  const questions = await LangModel.aggregate([
    {
      $match: {
        lang: langId,
      },
    },
    {
      $project: {
        _id: 0,
        "questiones._id": 1,
        "questiones.description": 1,
        "questiones.options.description": 1,
        "questiones.options._id": 1,
      },
    },
  ]);
  if (questions[0]?.questiones)
    return res.status(200).send(questions[0].questiones);
  else {
    return res.status(200).send([]);
  }
};

export const AnswerQuestione = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // await QuestionModel.create(req.body);
  let quesId = new mongoose.Types.ObjectId(req.params.quesId);
  let langId = req.params.langId;
  const questions = await LangModel.aggregate([
    {
      $match: {
        lang: langId,
      },
    },
    { $unwind: "$questiones" },
    {
      $match: {
        "questiones._id": quesId,
      },
    },
    {
      $project: {
        _id: 0,
        "questiones.options": 1,
        "questiones._id": 1,
      },
    },
  ]);
  if (questions.length > 0) {
    return res.status(200).send(questions[0].questiones);
  } else {
    return res.status(200).send([]);
  }
};

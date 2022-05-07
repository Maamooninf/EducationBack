import { Request, Response, NextFunction } from "express";
import { LangRes } from "./dto/lang.dto";
import { Language } from "./lang.interface";
import { LangModel } from "./lang.modal";

export const CreateLang = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lan = new LangModel(req.body);
  await lan.save();

  return res.status(200).send("language created Successfully");
};
export const GetLangs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const langs = await LangModel.aggregate([
    {
      $project: {
        lang: 1,
        description: 1,
      },
    },
  ]);
  return res.status(200).send(langs);
};

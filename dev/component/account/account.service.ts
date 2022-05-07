import { NextFunction, Request, Response } from "express";
import { AccountModel } from "./account.modal";

export const CreateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const account = await AccountModel.create({
    email: req.body.email,
    profilePic: req.body.profilePic,
    supername: req.body.supername,
    expertise: req.body.expertise,
  });
  if (account) return res.status(200).send("Account Created Successfully");
};

export const GetTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const teachers = await AccountModel.find(
    {
      expertise: { $in: req.params.lang },
    },
    {
      _id: 1,
      supername: 1,
    }
  );
  if (teachers) return res.status(200).send(teachers);
};

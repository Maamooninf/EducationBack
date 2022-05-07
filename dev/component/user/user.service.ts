import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "./user.modal";

export const GetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await UserModel.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);
  return res.status(200).send(data);
};

export const GetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let username = req.query.filterName ? req.query.filterName : "";
  let lang = req.query.language
    ? new mongoose.Types.ObjectId(req.query.language as string)
    : "";
  let page = req.query.page ? parseInt(req.query.page as string) : 1;
  const usersWithRoles = await UserModel.aggregate([
    { $match: { languages: { $in: [lang] } } },
    { $match: { name: { $regex: new RegExp(`${username}`, "i") } } },
    { $sort: { createdAt: -1 } },
    {
      $facet: {
        totalCount: [{ $count: "total" }],
        users: [
          { $skip: (page - 1) * 5 },
          { $limit: 5 },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
            },
          },
        ],
      },
    },
  ]);
  return res.status(200).send(usersWithRoles);
};

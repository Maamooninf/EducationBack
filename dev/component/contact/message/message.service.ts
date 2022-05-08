import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { ConversationModel } from "../conversation/conversatio.modal";
import { MessageModel } from "./message.model";

export const CreateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body = req.body;
  const message = await MessageModel.create({
    author: body.author,
    content: body.content,
    conversation: body.conversation,
  });
  await ConversationModel.findOneAndUpdate(
    { _id: body.conversation },
    { $set: { lastmessage: message.content } }
  );
  let result = await message.populate("author", "_id name");
  const io: Server = req.app.get("socketio");
  const newmessage = {
    _id: result._id,
    author: result.author,
    content: result.content,
    conversation: result.conversation,
  };
  console.log(result);
  io.to(`chat${body.conversation}`).emit("newMessage", newmessage);

  return res.status(200).send("message successfully created");
};
export const GetMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let con = new mongoose.Types.ObjectId(req.params.convId);
  let page = req.query.page ? parseInt(req.query.page as string) : 1;
  let offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
  const messages = await MessageModel.aggregate([
    {
      $match: {
        conversation: con,
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
    { $sort: { createdAt: -1 } },
    { $skip: (page - 1) * 10 + offset },
    { $limit: 10 },
    { $sort: { createdAt: 1 } },
    {
      $project: {
        content: 1,
        "author.name": 1,
        "author._id": 1,
      },
    },
  ]);
  return res.status(200).send(messages);
};

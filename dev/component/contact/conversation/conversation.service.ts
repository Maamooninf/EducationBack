import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { UserModel } from "../../user/user.modal";

import { ConversationModel } from "./conversatio.modal";

export const CreateConv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const conversation = await ConversationModel.create({
    language: req.body.language,
    members: req.body.members,
    picture: req.body.picture || "",
    title: req.body.title,
  });
  const io: Server = req.app.get("socketio");
  conversation.members?.forEach((user) => {
    io.to(`user:${user}`).emit("newConversation", {
      _id: conversation._id,
      title: conversation.title,
      picture: conversation.picture,
    });
  });
  return res.status(200).send("Conversation Successfully created");
};

export const GetConvs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user = new mongoose.Types.ObjectId(req.user._id);

  const conversations = await ConversationModel.aggregate([
    {
      $match: {
        members: {
          $in: [user],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        pricture: 1,
      },
    },
  ]);

  return res.status(200).send(conversations);
};

export const GetConvOfLang = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let lang = new mongoose.Types.ObjectId(req.params.langId);
  let user = new mongoose.Types.ObjectId(req.user._id);
  const conversations = await ConversationModel.aggregate([
    {
      $match: {
        //langId
        language: lang,
      },
    },
    {
      $addFields: {
        isjoined: {
          $cond: [{ $in: [user, "$members"] }, 1, 0],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        pricture: 1,
        isjoined: 1,
      },
    },
  ]);
  return res.status(200).send(conversations);
};

export const GetUserInConv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let convId = new mongoose.Types.ObjectId(req.params.convId);
  const conversations = await ConversationModel.aggregate([
    {
      $match: {
        _id: convId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
      },
    },
    {
      $project: {
        _id: 0,
        "members._id": 1,
        "members.name": 1,
        "members.email": 1,
        "members.Isonline": 1,
      },
    },
  ]);
  return res.status(200).send(conversations);
};

export const InsertUserToConv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const io: Server = req.app.get("socketio");
  const convers = await ConversationModel.findOneAndUpdate(
    { _id: req.params.convId },
    {
      $addToSet: {
        members: req.user._id,
      },
    }
  );
  if (convers) {
    const user = await UserModel.findOne(
      { _id: req.user._id },
      { _id: 1, Isonline: 1, name: 1, email: 1 }
    );
    io.to(`chat${req.params.convId}`).emit("InsertUser", {
      user: user,
      convId: req.params.convId,
    });
  }
  return res.status(200).send("User Added Successfully");
};

export const DeleteUserFromConv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const io: Server = req.app.get("socketio");
  const convers = await ConversationModel.findOneAndUpdate(
    { _id: req.params.convId },
    {
      $pull: {
        members: req.user._id,
      },
    }
  );
  if (convers) {
    io.to(`chat${req.params.convId}`).emit("RemoveUser", {
      userId: req.user._id,
      convId: req.params.convId,
    });
  }
  return res.status(200).send("User Deleted Successfully");
};

import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errorhand/ApiError";
import { UserModel } from "../user/user.modal";
import bcrypt from "bcryptjs";
import * as conf from "../../config/jwtConfig";
import { SignJwt } from "../../share/generatToken";
import jwt from "jsonwebtoken";
import { sendMail } from "../../initialapp/utils/nodemail";
import { User } from "../user/user.interface";
import { RoleModel } from "../role/role.modal";
import { Role } from "../role/role.interface";
import { SignInRes } from "./dto/Signin.dto";
import { role, roleNumbers } from "../../share/rolesEnum";

export const Signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //

  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(ApiError.badRequest({ message: "email/password invalid" }));
  }

  if (!user.IsConfirmed) {
    return next(ApiError.unAuth({ message: "Confirm your email" }));
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return next(ApiError.badRequest({ message: "email/password invalid" }));
  }
  const roles = await UserModel.aggregate([
    {
      $match: { email: req.body.email },
    },
    {
      $lookup: {
        from: "roles",
        localField: "roles",
        foreignField: "_id",
        as: "prival",
      },
    },

    {
      $project: { _id: 0, "prival.prival": 1 },
    },
  ]);
  const isUser =
    roles[0].prival?.filter((e: Role) => {
      return e.prival === role.User;
    }).length > 0
      ? roleNumbers.User
      : 0;

  const isAdmin =
    roles[0].prival?.filter((e: Role) => {
      return e.prival === role.Admin;
    }).length > 0
      ? roleNumbers.Admin
      : 0;
  const isTeacher =
    roles[0].prival?.filter((e: Role) => {
      return e.prival === role.Teacher;
    }).length > 0
      ? roleNumbers.Teacher
      : 0;
  const AccessToken = SignJwt(
    {
      _id: user._id,
      name: user.name,
      isUser: isUser,
      isAdmin: isAdmin,
      isTeacher: isTeacher,
    },
    conf.Secret_Key_Access,
    conf.Expire_Access
  );

  const RefreshToken = SignJwt(
    { name: user.name, _id: user._id },
    conf.Secret_Key_Refresh,
    conf.Expire_Refresh
  );

  const result = {
    accesstoken: AccessToken,
    refreshtoken: RefreshToken,

    isUser: isUser,
    isAdmin: isAdmin,
    isTeacher: isTeacher,
    _id: user._id,
  };

  return res.status(200).send(result);
};

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //

  const user = new UserModel(req.body);
  await user.save();
  const AccessToken = SignJwt(
    { _id: user._id, name: user.name },
    conf.Secret_Key_Confirm,
    conf.Expire_Confirm
  );

  await sendMail(user.email, AccessToken);

  return res.status(200).send("Message sent successfully");
};

export const CreateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let count = await RoleModel.count({ _id: { $in: req.body.roles } });
  if (count !== req.body.roles?.length) {
    return next(ApiError.badRequest("invalid id's"));
  }
  const account = new UserModel({
    name: req.body.name,
    IsConfirmed: true,
    email: req.body.email,
    password: req.body.password,
    roles: req.body.roles,
    languages: req.body.languages,
  });
  const result = await account.save();
  if (result) return res.status(200).send("account Successfully created");
};

export const RefreshGen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const AccessToken = SignJwt(
    { _id: req.body._id, name: req.body.name },
    conf.Secret_Key_Access,
    conf.Expire_Access
  );
  return res.status(200).send({ accesstoken: AccessToken });
};

export const ConfirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //

  const accesstok = req.params.token;

  const decoded = jwt.verify(accesstok, conf.Secret_Key_Confirm) as User;

  if (!decoded) {
    next(ApiError.Forbidden("Access denied"));
  }
  const { _id } = decoded;
  const user = await UserModel.findOne({ _id: _id });

  if (user?.IsConfirmed) {
    return next(ApiError.badRequest({ message: "Already Confirmed" }));
  }

  await UserModel.findOneAndUpdate(
    { _id: _id },
    { $set: { IsConfirmed: true } }
  );

  await RoleModel.findOneAndUpdate(
    { prival: "user" },
    {
      $push: { users: _id },
    }
  );

  return res.redirect("http://localhost:3000/signin");
};

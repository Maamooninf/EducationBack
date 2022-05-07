import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errorhand/ApiError";
import jwt from "jsonwebtoken";
import * as conf from "../config/jwtConfig";
import { DecodedUser, User } from "../component/user/user.interface";
export function RefreshMiddle(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(ApiError.unAuth({ message: "unauthenticated" }));
  } else {
    const decoded = jwt.verify(authorization, conf.Secret_Key_Refresh) as User;
    if (!decoded) {
      next(ApiError.Forbidden({ message: "access denied" }));
    }
    req.user = decoded;
    next();
  }
}

export function AccessMiddle(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization || authorization === undefined) {
    next(ApiError.unAuth({ message: "unauthenticated" }));
  } else {
    // const decoded = jwt.verify(authorization, conf.Secret_Key_Access)

    // console.log(decoded);
    // if (!decoded) {
    //   next(ApiError.Forbidden({ message: "access denied" }));
    // }
    // req.user = decoded as DecodedUser;
    // next();
    jwt.verify(authorization, conf.Secret_Key_Access, (err, decoded) => {
      if (err) {
        next(ApiError.Forbidden({ message: "access denied" }));
      }

      req.user = decoded as DecodedUser;
      next();
    });
  }
}

import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errorhand/ApiError";

export function AdminMiddle(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (user?.isAdmin) {
    return next();
  }
  return next(ApiError.Forbidden({ message: "Access Denied" }));
}

export function UserMiddle(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (user?.isUser) {
    return next();
  }
  return next(ApiError.Forbidden({ message: "Access Denied" }));
}

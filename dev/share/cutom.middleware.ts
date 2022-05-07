import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { ApiError } from "../errorhand/ApiError";
export function ValidateParam(req: Request, res: Response, next: NextFunction) {
  const validObjectId = Types.ObjectId.isValid(req.params.lecId);
  if (!validObjectId) {
    return next(ApiError.badRequest("invalid param"));
  }
  return next();
}

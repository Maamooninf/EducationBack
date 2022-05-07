import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ApiError } from "./ApiError";
export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }
  if (err instanceof TokenExpiredError) {
    return res
      .status(403)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(403).send({ message: "Invalid Token" });
  }
  console.log(err);
  return res.status(500).json("something went wrong");
}

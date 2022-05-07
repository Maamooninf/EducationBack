import { Request, Response, NextFunction } from "express";

export function TryCatch(handler: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };
}

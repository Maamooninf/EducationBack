import { Express, Request } from "express";
import { User } from "../../component/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: DecodedUser;
      io: any;
    }
  }
}

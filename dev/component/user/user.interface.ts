import mongoose from "mongoose";
import { Language } from "../language/lang.interface";
import { Role } from "../role/role.interface";

interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  // profilePic: string;
  socketId: string;
  confirmpassword: string;
  IsConfirmed: boolean;
  roles: Array<Role>;
  languages: Array<Language>;
  Isonline?: boolean;
  isUser?: number;
  isAdmin?: number;
  isEmploye?: number;
}
interface DecodedUser {
  _id: string;
  name: string;
  isUser: number;
  isAdmin: number;
  isTeacher: number;
}
export { User, DecodedUser };

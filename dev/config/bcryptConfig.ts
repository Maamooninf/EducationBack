import dotenv from "dotenv";
dotenv.config();
export const Salt_Factor = process.env.Salt_Factor
  ? parseInt(process.env.Salt_Factor!)
  : 8;

import dotenv from "dotenv";
dotenv.config();
export const Client_Id = process.env.Client_Id ? process.env.Client_Id : "";
export const Client_Secret = process.env.Client_Secret
  ? process.env.Client_Secret
  : "";
export const Redirect_Url = process.env.Redirect_Url
  ? process.env.Redirect_Url
  : "";
export const Refresh_Token_Google = process.env.Refresh_Token_Google
  ? process.env.Refresh_Token_Google
  : "";
export const Service = process.env.Service ? process.env.Service : "";
export const Manguser = process.env.Manguser ? process.env.Manguser : "";

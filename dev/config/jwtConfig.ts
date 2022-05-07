import dotenv from "dotenv";
dotenv.config();
export const Expire_Access = process.env.expire_Access
  ? process.env.expire_Access
  : "4m";
export const Expire_Refresh = process.env.expire_Refreh
  ? process.env.expire_Refreh
  : "1d";
export const Secret_Key_Access = process.env.Secret_Key_Acc
  ? process.env.Secret_Key_Acc
  : "sanrade";
export const Secret_Key_Refresh = process.env.Secret_Key_Ref
  ? process.env.Secret_Key_Ref
  : "hwtarvxer";
export const Secret_Key_Confirm = process.env.Secret_Key_Confirm
  ? process.env.Secret_Key_Confirm
  : "qeormnc";
export const Expire_Confirm = process.env.expire_Confirm
  ? process.env.expire_Confirm
  : "2m";

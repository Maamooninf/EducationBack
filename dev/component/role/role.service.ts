import { NextFunction, Request, Response } from "express";
import { RoleModel } from "./role.modal";

// export const CreateRole = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const role = new RoleModel(req.body);
//   await role.save();
//   return res.status(200).send("Role Created Successfully");
// };
export const GetRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roles = await RoleModel.find({}, { _id: 1, prival: 1 });
  return res.status(200).send(roles);
};

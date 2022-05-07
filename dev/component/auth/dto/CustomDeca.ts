import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import mongoose from "mongoose";
import { RoleModel } from "../../role/role.modal";
import { UserModel } from "../../user/user.modal";

@ValidatorConstraint({ name: "CustomMatchPasswords", async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Passwords do not match!";
  }
}
@ValidatorConstraint({ name: "CustomMatchEmail", async: true })
export class CustomMatchEmail implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const user = await UserModel.findOne({ email: email });
    if (user) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "email already exists";
  }
}
@ValidatorConstraint({ name: "CheckRoleExits", async: false })
export class CheckRoleExits implements ValidatorConstraintInterface {
  async validate(roles: Array<any>, args: ValidationArguments) {
    let count = await RoleModel.count({ _id: { $in: roles } });
    if (count !== roles.length) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Invalid id's";
  }
}
//  let count = await RoleModel.count( { _id: { $in: req.body.roles } } );

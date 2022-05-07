import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { AccountModel } from "../account.modal";
@ValidatorConstraint({ name: "CustomMatchEmail", async: true })
export class AccountMatchEmail implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const user = await AccountModel.findOne({ email: email });
    if (user) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "email already exists";
  }
}

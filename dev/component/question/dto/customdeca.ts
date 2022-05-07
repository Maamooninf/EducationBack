import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Types } from "mongoose";
@ValidatorConstraint({ name: "CustomObjectId", async: false })
export class CustomObjectId implements ValidatorConstraintInterface {
  validate(lecture: any, args: ValidationArguments) {
    const validObjectId = Types.ObjectId.isValid(lecture);
    if (!validObjectId) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "Invalid Object ID";
  }
}

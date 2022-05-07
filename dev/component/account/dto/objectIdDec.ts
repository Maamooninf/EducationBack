import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Types } from "mongoose";
@ValidatorConstraint({ name: "ObjectIdCustom", async: false })
export class ObjectIdCustom implements ValidatorConstraintInterface {
  validate(field: any, args: ValidationArguments) {
    let flag = 1;

    Array.isArray(field) &&
      field.map((ex) => {
        const validObjectId = Types.ObjectId.isValid(ex);
        if (!validObjectId || typeof ex !== "string") flag = 0;
      });

    return flag === 1;
  }

  defaultMessage(args: ValidationArguments) {
    return "Invalid ID";
  }
}

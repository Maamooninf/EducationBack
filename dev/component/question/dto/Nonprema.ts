import { ValidationArguments } from "class-validator";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
@ValidatorConstraint({ name: "Nonprimitive", async: false })
export class Nonprimitive implements ValidatorConstraintInterface {
  validate(field: any, args: ValidationArguments) {
    return (
      Array.isArray(field) &&
      field.reduce(
        (a, b) => a && typeof b === "object" && !Array.isArray(b),
        true
      )
    );
  }

  defaultMessage(args: ValidationArguments) {
    return "Array of objects expected";
  }
}

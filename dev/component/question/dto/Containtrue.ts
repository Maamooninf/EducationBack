import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
@ValidatorConstraint({ name: "ContainTrueOnes", async: false })
export class ContainTrueOnes implements ValidatorConstraintInterface {
  validate(field: any, args: ValidationArguments) {
    const count = field?.filter((obj: any) => obj.isTrue === true).length;
    if (count !== 1) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Only one True option Expected`;
  }
}

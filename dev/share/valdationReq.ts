import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "../errorhand/ApiError";
export function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObj: any = plainToClass(type, req.body);
    validate(dtoObj, {
      skipMissingProperties,
      validationError: {
        target: false,
        value: false,
      },
    })
      .then((errors: ValidationError[] = []) => {
        if (errors.length > 0) {
          let dtoErrors: {
            [key: string]: any;
          } = {};

          errors.forEach((key: ValidationError) => {
            dtoErrors[key.property] = {};
            if (key.constraints) {
              dtoErrors[key.property].constriants = (Object as any).values(
                key.constraints
              );
            }
          });

          next(ApiError.badRequest(dtoErrors));
        } else {
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  };
}

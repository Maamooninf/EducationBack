import {
  IsArray,
  ValidateNested,
  ArrayMaxSize,
  ArrayMinSize,
  IsString,
  IsBoolean,
  Validate,
} from "class-validator";
import { Type } from "class-transformer";
import { Option, Question } from "../question.interface";
import { Nonprimitive } from "./Nonprema";
import { ContainTrueOnes } from "./Containtrue";

class OptionDto implements Option {
  @IsString()
  description: string;
  @IsBoolean()
  isTrue: boolean;
}
export class QuestionDto implements Question {
  @IsString()
  description: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Validate(Nonprimitive, ["options"])
  @Validate(ContainTrueOnes, ["options"])
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @Type(() => OptionDto)
  options: OptionDto[];
}

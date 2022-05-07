import { Lecture, Slide } from "../lecture.interface";
import {
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  Validate,
} from "class-validator";
import { Type } from "class-transformer";
import { CustomObjectId } from "../../question/dto/customdeca";
import mongoose from "mongoose";

class SlideDto implements Slide {
  @IsString()
  @MinLength(5, { message: "too short content" })
  @MaxLength(250, { message: "too long content" })
  content: string;
  @IsString()
  kind: string;
}

export class LectureDto implements Lecture {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(7)
  @ValidateNested({ each: true })
  @Type(() => SlideDto)
  slides: SlideDto[];
  @Validate(CustomObjectId, ["language"])
  language: mongoose.Types.ObjectId;
  @IsString()
  title: string;
}

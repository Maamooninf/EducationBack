import { IsArray, IsOptional, IsString, Validate } from "class-validator";
import mongoose from "mongoose";
import { ObjectIdCustom } from "../../../account/dto/objectIdDec";
import { CustomObjectId } from "../../../question/dto/customdeca";
import { Conversation } from "../conversatio.interface";
export class ConversationDto implements Conversation {
  //
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsArray()
  @Validate(ObjectIdCustom)
  members: mongoose.Types.ObjectId[];

  @Validate(CustomObjectId)
  language: mongoose.Types.ObjectId;
}

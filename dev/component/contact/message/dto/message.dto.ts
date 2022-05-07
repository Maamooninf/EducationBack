import { IsString, Validate } from "class-validator";
import mongoose from "mongoose";
import { CustomObjectId } from "../../../question/dto/customdeca";
import { Message } from "../message.interface";
export class MessageDto implements Message {
  @IsString()
  content: string;
  @Validate(CustomObjectId)
  conversation: mongoose.Types.ObjectId;
  @Validate(CustomObjectId)
  author: mongoose.Types.ObjectId;
}

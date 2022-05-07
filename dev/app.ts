import "reflect-metadata";
import dotenv from "dotenv";
import { AuthController } from "./component/auth/auth.controller";
import { App } from "./initialapp/Appinit";
import { QuestionController } from "./component/question/question.controller";
import { LectureController } from "./component/lecture/lecture.controller";
import { LangController } from "./component/language/lang.controller";
import { UserController } from "./component/user/user.controller";
import { ConversationController } from "./component/contact/conversation/conversation.controller";
import { RoleController } from "./component/role/role.controller";
import { MessageController } from "./component/contact/message/message.controller";
dotenv.config();
const app = new App(
  [
    new AuthController(),
    new QuestionController(),
    new LectureController(),
    new LangController(),
    new UserController(),
    new ConversationController(),
    new RoleController(),
    new MessageController(),
  ],
  4010
);
app.listen();

import { IsString } from "class-validator";
import { Role } from "../role.interface";
export const RoleEnum = {
  Admin: "admin",
  Teacher: "teacher",
  Guest: "user",
};
export class RoleDto implements Role {
  @IsString()
  prival: string;
}

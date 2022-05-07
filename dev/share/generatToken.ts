import jwt from "jsonwebtoken";
export function SignJwt(Infobj: object, SecretKey: string, ExpireIn: string) {
  return jwt.sign(Infobj, SecretKey, {
    expiresIn: ExpireIn,
  });
}

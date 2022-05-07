import { google } from "googleapis";
import nodemailer from "nodemailer";
import * as conf from "../../config/nodemailerConfig";
import dotenv from "dotenv";
import { ApiError } from "../../errorhand/ApiError";
dotenv.config();
const client_id = conf.Client_Id;
const client_secret = conf.Client_Secret;
const redirect_url = conf.Redirect_Url;
const refresh_token = conf.Refresh_Token_Google;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_url
);

oAuth2Client.setCredentials({ refresh_token: refresh_token });
export async function sendMail(email: string, token: string) {
  try {
    const accessToken: any = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: conf.Service,
      auth: {
        type: "OAuth2",
        user: conf.Manguser,
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token,
        accessToken: accessToken,
      },
    });
    var mailOptions = {
      from: `ThaberSystem <${conf.Manguser}>`,
      to: email,
      subject: `Confirm Email`,
      text: "please confirm your email",
      html: `<a href=http://localhost:4010/auth/confEmail/${token}>click here</a>`,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err: any) {
    throw ApiError.TransPor("Failed to send confirm email");
  }
}

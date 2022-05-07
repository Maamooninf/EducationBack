import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import winston from "winston";
import { globaly } from "./App.interface";
import { apiErrorHandler } from "../errorhand/ApiErrorHandling";
import { Server, Socket } from "socket.io";
import { Conver } from "../component/contact/conversation/conversatio.interface";
import { UserModel } from "../component/user/user.modal";

export class App {
  public app: express.Application;
  public port: number;
  static logger: winston.Logger;
  public io: Server;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);

    App.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: "user-service" },
      transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });
    if (JSON.stringify(process.env.NODE_ENV) !== JSON.stringify("production")) {
      winston.add(App.logger);
      App.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
    process.on("uncaughtException", (ex) => {
      console.log(ex);
      App.logger.error("", ex.message);
      process.exit(1);
    });
    process.on("unhandledRejection", (ex) => {
      App.logger.error("", ex);
      process.exit(1);
    });
    mongoose.set("runValidators", true);
    mongoose
      .connect("mongodb://localhost/EducationTh")
      .then(() => {
        App.logger.log({
          level: "info",
          message: "Connected",
        });
      })
      .catch((err: any) => {
        App.logger.error("Enable to connect", err);
      });
    this.io = new Server({
      cors: {
        origin: "http://localhost:3000",
      },
    });
    this.initialSocket();
    this.app.set("socketio", this.io);
  }
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeControllers(controllers: globaly[]) {
    controllers.forEach((controller: globaly) => {
      this.app.use(controller.path, controller.router);
    });
    this.app.use(apiErrorHandler);
  }

  private initialSocket() {
    this.io.on("connection", (socket: Socket) => {
      // chat application

      socket.on(
        "joinAll",
        async (obj: { userId: string; groups: Conver[] }) => {
          let updateuser = await UserModel.findOneAndUpdate(
            { _id: obj.userId },
            { $set: { Isonline: true, socketId: socket.id } },
            {
              fields: { _id: 1, Isonline: 1, name: 1, email: 1 },
              new: true,
            }
          );

          obj.groups.forEach((g) => {
            if (g._id && g.isjoined !== 0) {
              socket.join(`chat${g._id}`);
            }
          });
          socket.join(`user:${obj.userId}`);
          this.io.emit("newUser", updateuser);
          console.log("joined successfully");
        }
      );

      socket.on("joinhand", (conId: string) => {
        socket.join(`chat${conId}`);
      });
      socket.on("leavehand", (conId: string) => {
        socket.leave(`chat${conId}`);
      });
      // socket.on("closeconne", () => {
      //   socket.disconnect();
      // });
      socket.on("disconnect", async () => {
        console.log("some one disconnect");
        let updateuser = await UserModel.findOneAndUpdate(
          { socketId: socket.id },
          { $set: { Isonline: false } },
          {
            fields: { _id: 1, Isonline: 1, name: 1, email: 1 },
            new: true,
          }
        );
        this.io.emit("newUser", updateuser);
      });
    });
  }

  public listen() {
    this.io.listen(
      this.app.listen(this.port, () => {
        App.logger.log({
          level: "info",
          message: `App listening on the port ${this.port}`,
        });
      })
    );
  }
}

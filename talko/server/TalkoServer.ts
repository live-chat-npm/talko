import http from "http";
import socketIO from "socket.io";
import express from "express";
import { json } from "body-parser";
import Session from "./Session";

const app = express();
const server = http.createServer();
const io = socketIO(server);

export default class TalkoServer {
  session: Session;
  defaultGreeting: boolean;

  constructor(session: Session, defaultGreeting: boolean = true) {
    this.session = session;
    this.defaultGreeting = defaultGreeting;
  }

  /**
   * Starts the talko server to start listening for data
   */
  start(port: number): void {
    server.listen(port, () =>
      console.log(`Talko server listening on port ${port}`)
    );

    io.on("connection", (socket: any) => {
      if (this.defaultGreeting) {
        socket.emit("greeting", "You are now connected! Welcome to talko");
      }

      // this.session.handleConnection(socket);
      socket.on("send_message", msg => {
        console.log(msg);
        socket.emit("send_message", msg);
      });

      // on disconnect
      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    });
  }
}

import io from "socket.io-client";
import Session from "./Session";

export default class TalkoClient {
  session: Session;

  socket: any;

  constructor(session: Session) {
    this.session = session;
  }

  start(port: number) {
    this.socket = io(`:${port}`);

    this.socket.on("connect", (s: any) => {
      this.session.handleConnection(s);
    });

    //     this.socket.on("greeting", msg => {
    //       upState("SERVER: " + msg.greeting);
    //     });

    //     this.socket.on("disconnect", msg => {
    //       upState("SERVER: " + msg);
    //       alert(
    //         "SERVER MESSAGE: " +
    //           msg +
    //           "\nADD DISCONNECT HERE IN /src/client/TakoClient.js"
    //       );
    //     });
  }

  sendMessage(text: string) {
    this.socket.on("send_message", () => {
      this.session.sendMessage(text);
    });
  }
}

const io = require("socket.io-client");

// require("dotenv").config();
// const PORT = process.env.CLIENT_PORT || 5050;
var socket;
var name;
// session: Session;

export default class TalkoClient {
  // constructor() {
  //   this.session = session;
  // }

  start = (port, upState, username) => {
    socket = io(":" + port);
    name = username;

    socket.on("connect", () => {
      alert("CONNECTED to Chat Server!");
    });

    socket.on("greeting", msg => {
      console.log(msg);
      upState("SERVER: " + msg);
    });

    socket.on("disconnect", msg => {
      upState("SERVER: " + msg);
      alert(
        "SERVER MESSAGE: " +
          msg +
          "\nADD DISCONNECT HERE IN /src/client/TakoClient.js"
      );
    });

    socket.on("send_message", msg => {
      upState("> " + msg.text);
      console.log(msg);
    });
  };

  sendMessage = text => {
    console.log({ text: text });
    socket.emit("send_message", { text: text });
  };
}

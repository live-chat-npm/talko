const io = require("socket.io-client");
require("dotenv").config();

var socket;

const PORT = process.env.CLIENT_PORT || 5050;

export default class Client {
  sendM = msg => {
    socket.emit("chat message", msg);
  };

  init = upState => {
    socket = io(":" + PORT);

    socket.on("connect", () => {
      console.log("CONNECTED!");
      alert("CONNECTED to Chat Server!");
    });

    socket.on("chat message", function(msg) {
      console.log(msg);
      upState("> " + msg);
    });
  };
}

// module.exports = {
//   init
// };

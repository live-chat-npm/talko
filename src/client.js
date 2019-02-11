const io = require("socket.io-client");

var socket;

export default class Client {
  sendM = msg => {
    socket.emit("chat message", msg);
  };

  init = upState => {
    socket = io("http://localhost:3001");

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

import * as io from "socket.io-client";
require("dotenv").config();

// SERVER connection object
var socket;

/**
 * @class [TalkoClient] :toolkit for talko client
 */
export default class TalkoClient {

  /**
   * @function start :initializes necessary socket and listeners
   * @param {number} port
   * @param {callback} upState
   */
  start(port, upState) {
    if (!port) port = process.env.CLIENT_PORT || 5050;

    // Connect to SERVER on specified port
    socket = io(":" + port);
   //Send a message when 

  // Connect to SERVER acknowledgement
    socket.on("connect", () => {
      console.log("CONNECTED to Chat Server!");
    });

    // Receive greeting (msg.content <string>) from SERVER
    socket.on("greeting", message => {
      upState({
        from: {
          id: -1,
          avatar: "",
          name: "-=:SERVER:=-"
        },
        content: message
      });
      console.log(socket)
    });

    // Perform disconnection
    socket.on("disconnect", message => {
      console.log("SERVER: " + message);
    });

    // Receive msg from SERVER
    socket.on("send_message", message => {
      upState(message);
    });
  
  }

  /**
   * @function sendMessage :sends message object to server.
   * @param {message{from:{id:number, avatar:string, name:string}, content:string} message
   */
  sendMessage(message) {
    socket.emit("send_message", message);
  }

  sendSocket() {
    return socket;
  }

}

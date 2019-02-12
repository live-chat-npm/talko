import * as io from "socket.io-client";
require("dotenv").config();

// SERVER connection object
var socket;

/**
 * @class [TalkoClient] :toolkit for talko client
 */
export default class TalkoClient {
  constructor(session) {
    this.session = session;
  }
  /**
   * @function start :initializes necessary socket and listeners
   * @param {number} port
   * @param {callback} upState
   */
  start(port, upState) {
    if (!port) port = process.env.CLIENT_PORT || 5050;

    // Connect to SERVER on specified port
    socket = io(":" + port);

    // Connect to SERVER acknowledgement
    socket.on("connect", () => {
      this.session.handleConnection();
    });

    // Receive greeting (msg.content <string>) from SERVER
    socket.on("greeting", message => {
      upState({
        from: {
          id: 0,
          avatar: "",
          name: "-=SERVER=-"
        },
        content: message
      });
    });

    // Perform disconnection
    socket.on("disconnect", message => {
      this.session.handleDisconnection(message);
    });

    // Receive msg from SERVER
    socket.on("send_message", message => {
      this.session.handleMessageReceived(upState, message);
    });
  }

  /**
   * @function sendMessage :sends message object to server.
   * @param {message{from:{id:number, avatar:string, name:string}, content:string} message
   */
  sendMessage(message) {
    this.session.handleMessageSend(socket, message);
  }
}

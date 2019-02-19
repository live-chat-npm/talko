import io from "socket.io-client";
import Message from "./Messages/Message";
import SessionHandler from "./SessionHandler";
require("dotenv").config();

var port = process.env.CLIENT_PORT || 5050;

// SERVER connection object
var socket;
// const updateMsgs;

/**
 * @class [TalkoClient] :toolkit for talko client
 */
export default class TalkoClient {
  /**
   * @function constructor :setup components message state setter and session for rep client
   * @param {SessionHandler} session
   * @param {callback} upState
   */
  constructor(upState) {
    this.session = new SessionHandler();
    this.upState = upState;
    this.name = "(React) Customer";
  }
  /**
   * @function start :initializes necessary socket and listeners
   */
  start() {
    // Connect to SERVER on specified port
    socket = io(":" + port);

    // Connect to SERVER acknowledgement
    socket.on("connect", () => {
      this.session.handleConnection();

      // let incGreetingMsg = Message(null, 0, "-=SERVER=-", null, message);
      // this.upState(incGreetingMsg);

      // Outgoing Message Identifying as Customer
      let outIdentifyMsg = new Message();
      outIdentifyMsg.newMessage("support", socket.id, this.name, "customer");
      socket.emit("identify", outIdentifyMsg);
    });

    socket.on("rep_found", message => {
      this.upState(message);
    });

    // Perform disconnection
    socket.on("disconnect", message => {
      this.session.handleDisconnection(message);
    });

    // Receive msg from SERVER
    socket.on("send_message", message => {
      this.session.handleMessageReceived(this.upState, message);
    });
  }

  /**
   * @function sendMessage :sends message object to server.
   * @param {message{from:{id:number, avatar:string, name:string}, content:string} message
   */
  sendMessage(content) {
    let message = new Message();
    message.newMessage(null, socket.id, this.name, content);
    this.session.handleMessageSend(socket, message);
    this.upState(message);
  }
}

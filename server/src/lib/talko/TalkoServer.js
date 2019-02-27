const http = require("http");
const socketIO = require("socket.io");
const TalkoSession = require("./TalkoSession");
const express = require("express");
const { json } = require("body-parser");
const Message = require("../Messages/Message");

const app = express();
app.use(json());
const server = http.createServer(app);
const io = socketIO(server);

var message = Message;

class TalkoServer {
  /**
   * Constructs a new talko server instance
   *
   * @param {TalkoSession} session - The session handler for this server
   * @param {boolean} defaultGreeting - Should we send a default greeting when a new connection is made?
   *                                    Set to true by default
   */
  constructor(session, defaultGreeting = true) {
    this.session = session;
    this.defaultGreeting = defaultGreeting;
  }

  /**
   * Starts the talko server to start listening for data
   *
   * @param {number} port - The port to listen for data on
   */
  start(port) {
    server.listen(port, () =>
      console.log(`Talko sever listening on port ${port}`)
    );

    io.on("connection", socket => {
      this.session.handleConnection(socket);

      //
      socket.on("identify", message => {
        this.session.handleIdentity(socket, message);
      });

      socket.on("offer_accept", message => {
        this.session.handleOfferAccept(socket, message);
      });

      // socket.on("next_waiting", repName => {
      //   this.session.handleWaitingList(socket, repName);
      // });

      socket.on("join", room => {
        this.session.handleRoomJoin(socket, room, defaultGreeting);
      });

      socket.on("send_message", message =>
        this.session.handleMessageSend(socket, message)
      );

      socket.on("disconnect", () => {
        this.session.handleDisconnection();
      });
    });
  }

  /**
   * Gets the express app instance
   *
   * @returns {app} the express app
   */
  getApp() {
    return app;
  }

  /**
   * Gets the uninvoked express instance
   *
   * @returns {express} the uninvoked express instnace
   */
  getExpress() {
    return express;
  }
}

module.exports = TalkoServer;

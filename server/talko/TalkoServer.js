const http = require("http");
const socketIO = require("socket.io");
const TalkoSession = require("./TalkoSession");
const express = require("express");
const { json } = require("body-parser");

const app = express();
app.use(json());
const server = http.createServer(app);
const io = socketIO(server);

/**
 * A socket.io server to communicate with the talko live-chat client
 *
 * @author Thomas Papp
 */
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
      this.session.handleConnection(socket, this.defaultGreeting);

      socket.on("join", room => {
        socket.join(room);
      });

      socket.on("send_message", msg =>
        this.session.handleMessageSend(socket, msg)
      );

      socket.on("disconnect", () => this.session.handleDisconnection());
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

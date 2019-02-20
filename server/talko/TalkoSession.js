const Message = require("../Messages/Message");
/**
 * A session handler skeleton for handling a socket session in the talko server
 *
 * @author Thomas Papp
 */
class TalkoSession {
  /**
   * Constructs a new talko session. Does not allow direct instances, you must extend off this class.
   */
  constructor() {
    // [customer IDs] in an array
    this.custWaiting = [];
    if (new.target === TalkoSession) {
      throw new TypeError(
        "Cannot construct TalkoSession instaces directly! Please extend this class."
      );
    }
  }

  /**
   * Handles a new connection. This method body is empty - override for usage
   *
   * @param {SocketIO.Client} socket - The socket that has connected
   */
  handleConnection(socket) {}

  /**
   * Handles adding a customer to the support chat pool
   *
   * @param {SocketIO.Client} socket - The socket which is sending the data
   * @param {string} name - The name of the customer
   */
  handleIdentity(socket, message) {
    //if CUSTOMER
    if (message.data.content == "customer") {
      console.log("NEW CUST");
      this.custWaiting.push({
        id: message.data.from.id,
        name: message.data.from.name
      });
      this.handleRoomJoin(socket, "support");
      socket.to("support").emit("offer", message);
      //if REPRESENTATIVE
    } else if (message.data.content == "representative") {
      console.log("new rep");
      this.handleRoomJoin(socket, "support");
      //   socket.emit("send_message", message);
      this.handleWaitingList(socket, message.data.from.name);
    }
  }

  handleWaitingList(socket, repName) {
    if (this.custWaiting.length != 0) {
      let cWait = this.custWaiting[0];
      let oMsg = Message.newMessage(
        socket.id,
        cWait.id,
        cWait.name,
        "ACCEPT ME: " + cWait.name + "!"
      );
      socket.emit("offer", oMsg);

      oMsg = Message.newMessage("support", socket.id, repName, cWait.id);
    }
  }

  handleOfferAccept(socket, message) {
    this.custWaiting.shift();
    // this.handleRoomJoin(socket, this.custWaiting.shift().room);
    socket.to(message.data.room).emit("rep_found", message);
    socket.emit("rep_found", message);
    // cWait.to("support").emit("offer", message);
    console.log(message);
    console.log("^handling^");
    // this.handleWaitingList(socket, message.data.from.name);
  }

  /**
   * Handles the joining of a socket room
   *
   * @param {SocketIO.Client} socket - The socket that is sending data
   * @param {number} room - The room that we're joining
   * @param {boolean} defaultGreeting - A flag to determine if we should send a default greeting
   *                                    when joining the room
   */
  handleRoomJoin(socket, room, defaultGreeting) {
    socket.join(room);
    if (defaultGreeting) {
      socket.emit("greeting", "Welcome! Thank you for choosing talko.io");
    }
  }

  /**
   * Handles received messages sent from the talko client
   *
   * @param {object} msg - The message object
   */
  handleMessageSend(socket, msg) {
    const { room } = msg.data;
    socket.to(room).emit("send_message", msg);
  }

  /**
   * Handles a socket disconnection
   */
  handleDisconnection() {}
}

module.exports = TalkoSession;

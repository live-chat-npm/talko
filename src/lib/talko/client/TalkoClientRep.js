import io from "socket.io-client";
import Message from "./Messages/Message";
import SessionHandler from "./SessionHandler";
require("dotenv").config();

// SERVER connection object
var offerSocket;
var custSockets = {};
var port = process.env.CLIENT_PORT || 5050;

/**
 * @class [TalkoClientRep] :toolkit for talko client
 */
export default class TalkoClientRep {
  /**
   * @function constructor :setup components message state setter and session for rep client
   * @param {callback} upState
   */
  constructor(upState) {
    this.session = new SessionHandler();
    this.upState = upState;
    this.name = "(React) Rep";
    this.myID = "";
    this.offerCustId = [];
    this.offerCustName = [];
  }

  /**
   * @function startOfferConnection :initializes necessary socket and listeners
   */
  startOfferConnection(newOffer) {
    // Connect to SERVER on specified port
    offerSocket = io(":" + port);

    // Connect to SERVER acknowledgement
    offerSocket.on("connect", () => {
      this.session.handleConnection();
      //
      let outIdentifyMsg = new Message();
      outIdentifyMsg.newMessage(
        "support",
        offerSocket.id,
        this.name,
        "representative"
      );
      offerSocket.emit("identify", outIdentifyMsg);
    });

    offerSocket.on("offer", message => {
      console.log(message);
      this.offerCustId.push(message.data.from.id);
      this.offerCustName.push(message.data.from.name);
      console.log("offer: " + this.offerCustName);
      newOffer(this.offerCustName);
    });

    offerSocket.on("rep_found", message => {
      console.log(
        "rep_found for: " + message.data.content + " / " + this.offerCustId[0]
      );
      if (this.offerCustId[0] == message.data.content) {
        this.offerCustId.shift();
        this.offerCustName.shift();
        newOffer(null);
        // offerSocket.emit("next_waiting", this.name);
      }
    });

    // Perform disconnection
    offerSocket.on("disconnect", message => {
      this.session.handleDisconnection(message);
    });

    // Receive msg from SERVER
    offerSocket.on("send_message", message => {
      console.log(message);
      this.session.handleMessageReceived(this.upState, message);
    });
  }

  /**
   * @function sendMessage :sends message object to server.
   * @param {id} id :id of desired customer for msg
   * @param {Message} message
   */
  sendMessage(id, content) {
    let message = new Message();
    message.newMessage(id, offerSocket.id, this.name, content);
    this.session.handleMessageSend(offerSocket, message, this.upState);
  }

  /**
   * @function offerAccept :sends message on "offer" socket to accept offered customer
   */
  offerAccept() {
    let outOfferAcceptMsg = new Message();
    outOfferAcceptMsg.newMessage(
      this.offerCustId[0],
      offerSocket.id,
      this.name,
      "this.offerCustId[0]"
    );
    offerSocket.emit("offer_accept", outOfferAcceptMsg);
    console.log("offer accepted: " + this.offerCustId[0]);

    let obj = {};
    obj["name"] = this.offerCustName[0];
    obj["id"] = this.offerCustId[0];

    return obj;
  }
}

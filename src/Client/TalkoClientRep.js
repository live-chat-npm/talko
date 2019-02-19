import io from "socket.io-client";
import Message from "./Messages/Message";
import SessionHandler from "./SessionHandler";
require("dotenv").config();

//2D ARRAY OF CUSTOMER ROOMS AND MSGS

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
    this.offerCustId = null;
    this.offerCustName = null;
  }

  /**
   * @function startOfferConnection :initializes necessary socket and listeners
   */
  startOfferConnection(newOffer) {
    // Connect to SERVER on specified port
    offerSocket = io(":" + port);

    // this.upState()
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
      if (this.offerCustId == null) {
        this.offerCustId = message.data.from.id;
        this.offerCustName = message.data.from.name;
        // this.upState(message, 0);
        console.log("offer: " + this.offerCustName);
        newOffer(this.offerCustName);
        // this.upState(message);
        //PASS ALERT UP TO COMPONENT AND FROM COMPONENT UP TO CLIENT LIST COMPONENT
      } else {
        let outOfferBusyMsg = new Message();
        outOfferBusyMsg.newMessage(
          "support",
          offerSocket.id,
          "(React) Rep",
          this.offerCustId
        );
        offerSocket.emit("offer_busy", outOfferBusyMsg);
        console.log("offer busy :[");
      }
    });

    // Perform disconnection
    offerSocket.on("disconnect", message => {
      this.session.handleDisconnection(message);
    });

    // Receive msg from SERVER
    offerSocket.on("send_message", message => {
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
    message.newMessage("support", custSockets[id].id, this.name, content);
    this.session.handleMessageSend(custSockets[id], message);
  }

  /**
   * @function offerAccept :sends message on "offer" socket to accept offered customer
   */
  offerAccept() {
    // let outOfferAcceptMsg = Message(
    //   "support",
    //   offerSocket.id,
    //   this.name,
    //   offerCustId
    // );
    // offerSocket.emit("offer_accept", outOfferAcceptMsg);
    // //add new Socket connection to custSockets by custID
    // let newCustSock = {};
    // newCustSock[offerCustId] = io(":" + port);
    custSockets[this.offerCustId] = io(":" + port);
    let obj = {};
    obj["name"] = this.offerCustName;
    obj["id"] = this.offerCustId;

    // console.log(this.offerCustId);

    //init listeners for new customer connection
    this.startCustConnection(custSockets[this.offerCustId], this.offerCustId);

    return obj;
  }

  /**
   * @function startCustConnection :initializes necessary listeners for new Customer connection
   * @param {*} custSocket
   * @param {*} reqCustomer
   */
  startCustConnection(custSocket, reqCustomer) {
    let cid = this.offerCustId;
    this.offerCustId = null;
    let n = this.offerCustName;
    this.offerCustName = null;
    console.log("cust name: " + n);

    // Connect to SERVER acknowledgement
    custSocket.on("connect", () => {
      this.session.handleConnection();
    });

    // Perform disconnection from CUSTOMER through SERVER connection
    custSocket.on("disconnect", message => {
      this.session.handleDisconnection(message);
    });

    // Receive msg from CUSTOMER by way of SERVER
    custSocket.on("send_message", message => {
      this.session.handleMessageReceived(this.upState, message);
    });
  }
}

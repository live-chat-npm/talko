import React, { Component } from "react";
import { UserListWindow, Header, UsersList, User } from "./ChatComponents";
import TalkoClientRep from "./client/TalkoClientRep";
import Message from "./client/Messages/Message";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      tabs: [],
      chatHistory: {}, //user.id : [Message ...]
      currentCustomer: {}, //user.id
      customerList: [{ "Customer 1": 1 }, { "Customer 2": 2 }],
      currentMessage: "" //input field
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.updateState = this.updateState.bind(this);

    this.tRep = new TalkoClientRep(this.updateState);
  }

  componentDidMount() {
    this.tRep.startOfferConnection();
  }

  updateState(m, id) {
    let newMsg = {};
    // let idd = id;
    newMsg[id] = { ...this.state.chatHistory[id], m };
    this.setState({
      chatHistory: { ...this.state.chatHistory, newMsg }
    });
  }

  sendMsg() {
    this.tRep.sendMessage(
      Object.values(this.state.currentCustomer),
      new Message(
        new Date().toUTCString(),
        0,
        null,
        null,
        this.state.currentMessage
      )
    );
  }

  createTab = customer => {
    this.setState((this.state.currentCustomer = customer));
    console.log(Object.values(this.state.currentCustomer));
    this.setState({ tabs: [...this.state.tabs, Object.keys(customer)] });
  };
  acceptCustomer = () => {
    let newC = {};
    newC = this.tRep.offerAccept();
    // let newCID = this.tRep.offerAccept();
    // let newCList = Object.assign({}, this.tRep.offerAccept());
    this.setState({ customerList: { ...this.state.customerList, newC } });
  };

  render() {
    var chatHistory = (
      <div>
        {this.state.chatHistory[Object.values(this.state.currentCustomer)]}
      </div>
    );
    // let chatHistory = this.state.chatHistory.map((history, index) => {

    let selectTabs = this.state.tabs.map((tab, index) => {
      return (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            border: "solid 2px black"
          }}
        >
          {tab}
        </div>
      );
    });
    // for (let customer in this.state.customerList) {
    var roster = this.state.customerList.map((customer, index) => {
      return (
        <User key={index} onClick={() => this.createTab(customer)}>
          {"Status: " + Object.keys(customer)}
        </User>
      );
    });
    return (
      <div>
        <UserListWindow>
          <Header>
            <div style={{ fontSize: "10px", paddingLeft: "10px" }}>
              <h1>Customers</h1>
            </div>
          </Header>
          <UsersList>{roster}</UsersList>
          <button onClick={this.acceptCustomer}>Accept</button>
        </UserListWindow>
        <div>{selectTabs}</div>
        <div>{chatHistory}</div>
        <div>
          <input
            onChange={e => {
              this.setState({ currentMessage: e.target.value });
            }}
          />
          <button onClick={this.sendMsg}>Send</button>
        </div>
      </div>
    );
  }
}

export default UserList;

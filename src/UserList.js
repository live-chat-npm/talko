import React, { Component } from "react";
import TalkoClientRep from "./Client/TalkoClientRep";
import Message from "./Client/Messages/Message";
import {
  UserListWindow,
  Header,
  UsersList,
  User,
  UserMessagesWindow,
  TabWindow,
  Tab,
  ChatContentWindow,
  ReplyInputWindow,
  ReplyInput,
  Status
} from "./ChatComponents";
import { json } from "body-parser";

class UserList extends Component {
  constructor() {
    super();
    this.firstMsg = new Message();
    this.firstMsg.newMessage("support", 1, "SERVER", "HI!");
    this.state = {
      tabs: [],
      chatHistory: [],
      customerList: [
        { name: "Customer 1", id: "1", chat: [this.firstMsg] },
        { name: "Customer 2", id: "2", chat: [this.firstMsg] },
        { name: "Customer 3", id: "3", chat: [this.firstMsg] },
        { name: "Customer 4", id: "4", chat: [this.firstMsg] }
      ],
      currentMessage: "",
      currentOffer: ""
    };
    this.updateState = this.updateState.bind(this);
    this.tRep = new TalkoClientRep(this.updateState);
  }

  componentDidMount() {
    this.tRep.startOfferConnection(this.newOffer);
  }

  updateState(m, local) {
    let stateCopy = Object.assign([], this.state.customerList);
    let cust = stateCopy.filter(customer => {
      return customer.id == local; //m.data.from.id;
    });

    if (cust[0] != undefined) {
      let cPos = stateCopy.indexOf(cust[0]);
      cust = cust[0].id;
      console.log(cPos);
      console.log(this.state.customerList); //(cust.id + ", " + id);
      console.log(this.state.customerList[cPos].chat);
      let newMsg = [...this.state.customerList[cPos].chat, m];
      stateCopy[cPos].chat = newMsg;
      this.setState({ customerList: stateCopy });
    }
  }

  createTab = (customer, chat) => {
    const { tabs } = this.state;

    //
    for (let i = 0; i < tabs.length; i++) {
      if (customer === tabs[i]) {
        return;
      }
    }

    this.setState({
      tabs: [...this.state.tabs, customer]
    });

    //clears the chat history each time a tab is created then runs a callback
    this.setState(
      {
        chatHistory: []
      },
      //moves the customers chat history into the array in state
      () => {
        this.setState({
          chatHistory: [...this.state.chatHistory, chat]
        });
      }
    );
  };

  closeTab = customer => {
    //references the chat history for the next tab after one is closed
    let nextCustomer;
    //stores the index of the next customer to be used later
    let nextCustomerIndex = this.state.tabs.findIndex(
      cust => customer === cust
    );
    //filters out the tab that was clicked and leaves the open tabs
    let openTabs = this.state.tabs.filter(cust => cust !== customer);

    this.setState(
      {
        tabs: openTabs
      },
      () => {
        if (this.state.tabs[nextCustomerIndex]) {
          nextCustomer = this.state.tabs[nextCustomerIndex];
        } else {
          nextCustomer = this.state.tabs[nextCustomerIndex - 1];
        }

        var currentChatHistory = this.state.customerList.find(
          cust => cust.name === nextCustomer
        );

        if (currentChatHistory) {
          this.setState({
            chatHistory: [currentChatHistory]
          });
        } else {
          this.setState({
            chatHistory: []
          });
        }
      }
    );
  };

  //Sets the chat history for the selected customer
  setChatHistory = name => {
    let cust = this.state.customerList.filter(customer => {
      return customer.name === name;
    });
    this.setState({
      chatHistory: [cust[0]]
    });
  };

  sendMessage() {
    console.log("SENDING ATTEMPT");
    console.log(this.state.chatHistory[0].id);
    this.tRep.sendMessage(
      this.state.chatHistory[0].id,
      this.state.currentMessage
    );
  }

  pressedEnter = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  newOffer = name => {
    this.setState({ currentOffer: name });
  };

  acceptCustomer = () => {
    if (this.state.currentOffer) {
      let newC = {};
      newC = this.tRep.offerAccept();
      newC = { ...newC, chat: [this.firstMsg] };
      let stateCopy = this.state.customerList; //.map((copy)=>{true})
      stateCopy.push(newC);
      console.log(stateCopy);
      this.setState({ customerList: stateCopy });
      console.log(this.state.customerList);
    }
  };

  render() {
    let chatHistory;
    console.log(this.state.chatHistory[0]);
    if (this.state.chatHistory[0] != undefined) {
      chatHistory = this.state.chatHistory[0].chat.map((msg, index) => {
        return (
          <div key={index}>
            <p
              style={{ margin: "1px", fontSize: "10px", fontWeight: "lighter" }}
            >
              {msg.data.from.name}{" "}
              {msg.data.time !== undefined && msg.data.time}
            </p>
            {msg.data.content}
            <hr />
          </div>
        );
      });
    }

    let selectTabs = this.state.tabs.map((tab, index) => {
      return (
        <Tab key={index}>
          <div
            onClick={() => this.closeTab(tab)}
            style={{ border: "solid 2px black" }}
          >
            X
          </div>
          <div onClick={() => this.setChatHistory(tab)}>{tab}</div>
        </Tab>
      );
    });

    // new inc customer offer
    let offerCustomer = this.state.currentOffer;

    let roster = this.state.customerList.map((customer, index) => {
      return (
        <User
          key={index}
          onClick={() => {
            this.createTab(customer.name, customer.chat);
            this.setChatHistory(customer.name);
          }}
        >
          <Status />
          {customer.name}
        </User>
      );
    });

    return (
      <div style={{ display: "flex" }}>
        <UserListWindow>
          <Header>
            <div style={{ fontSize: "15px", color: "white" }}>
              <h1>Customers</h1>
            </div>
          </Header>
          <UsersList>{roster}</UsersList>
          <div>{offerCustomer}</div>
          <button onClick={this.acceptCustomer}>Accept</button>
        </UserListWindow>
        <UserMessagesWindow>
          <div>
            <TabWindow>{selectTabs}</TabWindow>
            <ChatContentWindow>{chatHistory}</ChatContentWindow>
          </div>
          <ReplyInputWindow>
            <ReplyInput
              onKeyPress={this.pressedEnter}
              onChange={e => this.setState({ currentMessage: e.target.value })}
            />
            <button onClick={this.sendMessage}>Send</button>
          </ReplyInputWindow>
        </UserMessagesWindow>
      </div>
    );
  }
}

export default UserList;

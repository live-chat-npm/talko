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
  }

  componentDidMount() {
    this.tRep = new TalkoClientRep(this.updateState);
    this.tRep.startOfferConnection(this.newOffer);
  }

  updateState(m, id) {
    // let newMsg = {};
    let stateCopy = Object.assign([], this.state.customerList);
    // let stateCopy = this.state.customerList;
    let cust = stateCopy.filter(customer => {
      // return customer.id === id;
      return customer.id == m.data.from.id;
    });
    // let idc = this.state.customerList.findIndex(elm => {
    //   return elm["id"] == id;
    // });
    if (cust[0] != undefined) {
      console.log(cust[0].id);
      console.log(this.state.customerList); //(cust.id + ", " + id);
      console.log(m);
      let newMsg = [...this.state.customerList[cust[0].id]["chat"], m];
      stateCopy[cust[0].id].chat = newMsg;
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
            chatHistory: [currentChatHistory.chat]
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

    // console.log("customer: " + cust);
    // let currentCust = this.state.customerList.findIndex(

    this.setState(
      {
        chatHistory: [cust[0]]
      }
      // () => {
      //   this.setState({
      //     chatHistory: [...this.state.chatHistory, cust[0]]
      //   });
      // }
    );
    // console.log(this.state.chatHistory[0]);
  };

  sendMessage() {
    let msg = new Message();
    console.log("SENDING ATTEMPT");
    console.log(this.state.chatHistory[0].id);
    this.tRep.sendMessage(
      this.state.chatHistory[0].id,
      this.state.currentMessage
    );
    console.log(msg);
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
    this.setState({ currentOffer: null });

    let newC = {};
    newC = this.tRep.offerAccept();
    newC = { ...newC, chat: [this.firstMsg] };
    // let newCID = this.tRep.offerAccept();
    // let newCList = Object.assign({}, this.tRep.offerAccept());
    let stateCopy = this.state.customerList; //.map((copy)=>{true})
    // Object.assign([], this.state.customerList);
    stateCopy.push(newC);
    console.log(stateCopy);
    this.setState({ customerList: stateCopy });
    console.log(this.state.customerList);
    // this.setState({ customerList: { ...this.state.customerList, newC } });
  };

  render() {
    let chatHistory;
    console.log(this.state.chatHistory[0]);
    if (this.state.chatHistory.length != 0) {
      chatHistory = this.state.chatHistory[0].chat.map((msg, index) => {
        return <div key={index}>{msg.data.content}</div>;
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

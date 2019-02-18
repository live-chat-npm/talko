import React, { Component } from "react";
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
  ReplyInput
} from "./ChatComponents";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      tabs: [],
      chatHistory: [],
      customerList: [
        { name: "Customer 1", chat: "hello" },
        { name: "Customer 2", chat: "hihihi" },
        { name: "Customer 3", chat: "sup" },
        { name: "Customer 4", chat: "yellow" }
      ]
    };

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

  createTab = (customer, chat) => {
    const { tabs } = this.state;

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
    let nextCustomer;
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

    this.setState(
      {
        chatHistory: []
      },
      () => {
        this.setState({
          chatHistory: [...this.state.chatHistory, cust[0].chat]
        });
      }
    );
  };

  sendMessage = () => {
    console.log("message sent");
  };

  pressedEnter = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  acceptCustomer = () => {
    let newCustomer = {};
    newCustomer = this.tRep.offerAccept();

    this.setState({
      customerList: { ...this.state.customerList, newCustomer }
    });
  };

  render() {
    let chatHistory = this.state.chatHistory.map((history, index) => {
      return <div key={index}>{history}</div>;
    });

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

    let roster = this.state.customerList.map((customer, index) => {
      return (
        <User
          key={index}
          onClick={() => this.createTab(customer.name, customer.chat)}
        >
          {customer.name}
        </User>
      );
    });

    return (
      <div style={{ display: "flex" }}>
        <UserListWindow>
          <Header>
            <div>
              <h1>Customers</h1>
            </div>
          </Header>
          <UsersList>{roster}</UsersList>
          <button onClick={this.acceptCustomer}>Accept</button>
        </UserListWindow>
        <UserMessagesWindow>
          <div>
            <TabWindow>{selectTabs}</TabWindow>
            <ChatContentWindow>{chatHistory}</ChatContentWindow>
          </div>
          <ReplyInputWindow>
            <ReplyInput onKeyPress={this.pressedEnter} />
            <button onClick={this.sendMessage}>Send</button>
          </ReplyInputWindow>
        </UserMessagesWindow>
      </div>
    );
  }
}

export default UserList;

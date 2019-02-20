import React, { Component } from "react";
import TalkoClientRep from "./client/TalkoClientRep";
import Message from "./client/Messages/Message";
import logo from "./images/talko-logo.png";
import {
  UserListWindow,
  Header,
  UsersList,
  UserListHeader,
  UserWindow,
  User,
  AcceptButton,
  RepSendButton,
  UserMessagesWindow,
  TabWindow,
  Tab,
  ChatContentWindow,
  ReplyInputWindow,
  ReplyInput,
  CloseTabButton,
  Status
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
        {
          name: "Customer 4",
          chat:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad aliquam est pariatur soluta, minus magni animi quasi impedit itaque veniam sapiente dolorum inventore cumque laudantium! Quos dolorum rem consequatur et."
        },
        { name: "Customer 5", chat: "hello" },
        { name: "Customer 6", chat: "hihihi" },
        { name: "Customer 7", chat: "sup" },
        { name: "Customer 8", chat: "hello" },
        { name: "Customer 9", chat: "hihihi" },
        { name: "Customer 10", chat: "sup" },
        { name: "Customer 11", chat: "hello" },
        { name: "Customer 12", chat: "hihihi" },
        { name: "Customer 13", chat: "sup" },
        { name: "Customer 14", chat: "hello" },
        { name: "Customer 15", chat: "hihihi" },
        { name: "Customer 16", chat: "sup" }
      ],
      currentMessage: "",
      active: null,
      rightClickWindow: false
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
    let chatTest = [chat];

    //checks if the tab already exists
    for (let i = 0; i < tabs.length; i++) {
      if (customer === tabs[i]) {
        //finds the index of the customer in the tabs array and sets that number to active
        let index = this.state.tabs.findIndex(
          customerName => customer === customerName
        );

        this.setState({
          active: index
        });

        //sets the chat history for the selected customer
        this.setState({
          chatHistory: [...chatTest]
        });
        return;
      }
    }

    this.setState(
      {
        tabs: [...this.state.tabs, customer]
      },
      () => {
        //finds the index of the customer in the tabs array and sets that number to active
        let index = this.state.tabs.findIndex(
          customerName => customer === customerName
        );

        this.setState({
          active: index
        });
      }
    );

    //clears the chat history each time a tab is created then runs a function
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

  //Sets the chat history for the selected customer when a tab is clicked
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

  sendMessage() {
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

  pressedEnter = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  acceptCustomer = () => {
    let newC = {};
    newC = this.tRep.offerAccept();
    // let newCID = this.tRep.offerAccept();
    // let newCList = Object.assign({}, this.tRep.offerAccept());
    this.setState({ customerList: { ...this.state.customerList, newC } });
  };

  render() {
    let chatHistory = this.state.chatHistory.map((history, index) => {
      return <div key={index}>{history}</div>;
    });

    let selectTabs = this.state.tabs.map((tab, index) => {
      let color = this.state.active === index ? "#56CC82" : "#292F36";

      return (
        <Tab
          key={index}
          onClick={() => {
            this.setChatHistory(tab);
            this.setState({
              active: index
            });
          }}
          style={{ background: color, marginBottom: "50px" }}
        >
          <div>{tab}</div>
          <CloseTabButton
            onClick={e => {
              e.stopPropagation();
              this.closeTab(tab);
              if (this.state.tabs[index + 1]) {
                this.setState({
                  active: index
                });
              } else {
                this.setState({
                  active: index - 1
                });
              }
            }}
          >
            X
          </CloseTabButton>
        </Tab>
      );
    });

    let roster = this.state.customerList.map((customer, index) => {
      let abbreviatedText = customer.chat
        .split("")
        .splice(0, 80)
        .join("");

      return (
        <UserWindow
          key={index}
          onClick={() => {
            this.createTab(customer.name, customer.chat);
          }}
        >
          <User key={index}>
            <Status />
            {customer.name}
          </User>
          <div
            style={{
              color: "#fff",
              opacity: 0.7,
              fontSize: "12px",
              paddingLeft: "30px",
              paddingBottom: "10px"
            }}
          >
            {abbreviatedText + (abbreviatedText.length < 80 ? "" : "...")}
          </div>
        </UserWindow>
      );
    });

    return (
      <div style={{ display: "flex" }}>
        <UserListWindow>
          <Header>
            <UserListHeader>
              <img src={logo} alt="logo" />
              <h1
                style={{
                  color: "white",
                  letterSpacing: "1px"
                }}
              >
                Talko.io
              </h1>
              <AcceptButton onClick={this.acceptCustomer}>Accept</AcceptButton>
            </UserListHeader>
          </Header>
          <UsersList>{roster}</UsersList>
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
            <RepSendButton onClick={this.sendMessage}>Send</RepSendButton>
          </ReplyInputWindow>
        </UserMessagesWindow>
      </div>
    );
  }
}

export default UserList;

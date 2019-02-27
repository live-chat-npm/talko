import React, { Component } from "react";
import TalkoClientRep from "./client/TalkoClientRep";
import Message from "./client/Messages/Message";
import logo from "./images/talko-logo.png";
import error from "./images/warning.png";
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
    this.firstMsg = []; // this.firstMsg.newMessage(0, 0, "SERVER", "");

    this.state = {
      tabs: [],
      chatHistory: [],
      customerList: [],
      currentMessage: "",
      currentOffer: 0,
      notification: false,
      notificationMessage: "",
      error: false //set to true if user triggers a notification that is for an error message
    };

    this.newMessage = React.createRef();
    this.updateState = this.updateState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.notification = this.notification.bind(this);
    this.closeTab = this.closeTab.bind(this);
    this.createTab = this.createTab.bind(this);
    this.setChatHistory = this.setChatHistory.bind(this);
    this.pressedEnter = this.pressedEnter.bind(this);
    this.newOffer = this.newOffer.bind(this);
    this.acceptCustomer = this.acceptCustomer.bind(this);
    this.tRep = new TalkoClientRep(this.updateState);
  }

  componentDidMount() {
    this.tRep.startOfferConnection(this.newOffer);
  }

  componentDidUpdate() {
    if (this.newMessage.current) {
      this.scrollToBottom();
    }
  }

  //Keeps the message window scrolled to the newest message
  scrollToBottom() {
    this.newMessage.current.scrollIntoView();
  }

  updateState(m, local) {
    let stateCopy = Object.assign([], this.state.customerList);
    let cust = stateCopy.filter(customer => {
      return customer.id == local; //m.data.from.id;
    });

    if (cust[0]) {
      let cPos = stateCopy.indexOf(cust[0]);
      cust = cust[0].id;
      let newMsg = [...this.state.customerList[cPos].chat, m];
      stateCopy[cPos].chat = newMsg;
      this.setState({ customerList: stateCopy });
    }
  }

  notification(message, error) {
    this.setState({
      notification: true,
      notificationMessage: message,
      error: error ? error : false
    });

    setTimeout(() => {
      this.setState({
        notification: false,
        error: error ? error : false
      });
    }, 4000);
  }

  createTab(customer, chat) {
    const { tabs } = this.state;

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
          chatHistory: [...this.state.chatHistory, chat]
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
    this.setChatHistory(customer);
  }

  closeTab(customer) {
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
  }

  //Sets the chat history for the selected customer when a tab is clicked
  setChatHistory(name) {
    let cust = this.state.customerList.filter(customer => {
      return customer.name === name;
    });

    this.setState({
      chatHistory: [cust[0]]
    });
  }

  sendMessage() {
    if (this.state.currentMessage == "") {
      return;
    }

    if (this.state.chatHistory[0]) {
      this.tRep.sendMessage(
        this.state.chatHistory[0].id,
        this.state.currentMessage
      );
      this.setState({ currentMessage: "" });
    } else {
      this.notification("No Customer Selected", true);
    }
  }

  pressedEnter(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  newOffer(name) {
    if (name) {
      this.setState({ currentOffer: this.state.currentOffer + 1 });
    } else {
      this.setState({ currentOffer: this.state.currentOffer - 1 });
    }
  }

  acceptCustomer() {
    if (this.state.currentOffer) {
      let newC = {};
      newC = this.tRep.offerAccept();
      this.firstMsg.push(new Message());
      this.firstMsg[this.firstMsg.length - 1].data.content =
        "You've accepted Customer: \"" + newC.name + '"';
      newC = { ...newC, chat: [this.firstMsg[this.firstMsg.length - 1]] };
      let stateCopy = this.state.customerList; //.map((copy)=>{true})
      stateCopy.push(newC);
      this.setState({ customerList: stateCopy });
      this.createTab(newC.name, newC.chat);
    }
  }

  render() {
    let chatHistory;
    if (this.state.chatHistory[0] && this.state.chatHistory[0].chat) {
      chatHistory = this.state.chatHistory[0].chat.map((msg, index) => {
        let bgColor;
        {
          msg.data.time && msg.data.from.name.includes("Rep")
            ? (bgColor = "#2F363E")
            : (bgColor = "white");
        }
        return (
          <div
            key={index}
            style={{
              backgroundColor: bgColor,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "solid 1px lightgray",
              paddingTop: "2px",
              lineHeight: "1.6",
              paddingBottom: "10px"
            }}
          >
            <div
              style={{
                color:
                  msg.data.time && msg.data.from.name.includes("Rep")
                    ? "white"
                    : "black"
              }}
            >
              {msg.data.time ? (
                <div
                  style={{
                    paddingLeft: "5px",
                    fontSize: "10px",
                    fontWeight: "lighter",
                    opacity: 0.8
                  }}
                >
                  {msg.data.from.name.includes("Rep")
                    ? "You"
                    : msg.data.from.name}
                </div>
              ) : null}
              <div style={{ paddingLeft: "5px", maxWidth: "72vw" }}>
                {msg.data.content}
              </div>
            </div>
            <p
              style={{
                margin: "0px",
                fontSize: "10px",
                fontWeight: "lighter",
                color:
                  msg.data.time && msg.data.from.name.includes("Rep")
                    ? "white"
                    : "black",
                paddingRight: "30px"
              }}
            >
              <div> {msg.data.time} </div>
            </p>
          </div>
        );
      });
    }

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
          style={{ background: color }}
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

    // new inc customer offer
    let offerCustomer = this.state.currentOffer;

    let roster = this.state.customerList.map((customer, index) => {
      let abbreviatedText = customer.chat.slice();
      abbreviatedText = abbreviatedText[abbreviatedText.length - 1].data.content
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
              paddingBottom: "10px",
              paddingRight: "5px"
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <img src={logo} alt="logo" />
                <h1
                  style={{
                    color: "white",
                    letterSpacing: "1px"
                  }}
                >
                  Talko.io
                </h1>
              </div>
              {offerCustomer ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AcceptButton
                      style={{
                        color: "white"
                      }}
                      onClick={this.acceptCustomer}
                    >
                      Accept
                    </AcceptButton>
                    <div
                      style={{
                        margin: "0 auto 0 auto",
                        padding: "2px 8px",
                        borderRadius: "5px",
                        color: "white"
                      }}
                    >
                      <h2>{offerCustomer}</h2>
                    </div>
                  </div>
                </div>
              ) : null}
            </UserListHeader>
          </Header>
          <UsersList>{roster}</UsersList>
        </UserListWindow>
        <UserMessagesWindow>
          <div>
            <TabWindow>{selectTabs}</TabWindow>
            <ChatContentWindow>
              {chatHistory} <div ref={this.newMessage} />
            </ChatContentWindow>
          </div>
          <ReplyInputWindow>
            <ReplyInput
              value={this.state.currentMessage}
              onKeyPress={this.pressedEnter}
              onChange={e => this.setState({ currentMessage: e.target.value })}
            />
            <RepSendButton onClick={this.sendMessage}>Send</RepSendButton>
          </ReplyInputWindow>
        </UserMessagesWindow>
        {this.state.notification ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "fixed",
              width: "230px",

              transform: "translateX(calc(100vw - 230px))",
              top: "70px",
              background: "#1E2127",
              border: "solid 2px black",
              color: "white",
              transition: ".2s"
            }}
          >
            {this.state.error ? (
              <img src={error} alt="error" style={{ paddingLeft: "10px" }} />
            ) : null}
            <p style={{ paddingLeft: "5px", paddingRight: "10px" }}>
              {this.state.notificationMessage}
            </p>
          </div>
        ) : (
          <div
            style={{
              position: "fixed",
              width: "200px",
              transform: "translateX(120vw)",
              top: "70px",
              background: "white",
              border: "solid 2px black",
              transition: ".4s"
            }}
          >
            <p>{this.state.notificationMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

export default UserList;

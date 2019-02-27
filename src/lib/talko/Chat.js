import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import logo from "./images/logo.jpg";
import sendButtonBlack from "./images/send-button-black.png";
import sendButtonWhite from "./images/send-button-white.png";
import TalkoClient from "./client/TalkoClient";
import {
  ChatWindow,
  InputWindow,
  Input,
  SendButton,
  MinimizedChatWindow,
  Header,
  HeaderTitle,
  Profile,
  ProfileImage,
  Name,
  Title,
  Logo,
  MessageWindow,
  Message,
  MaximizeButton,
  MinimizeButton,
  Footer,
  Credit
} from "./ChatComponents";
import ContactForm from "./ContactForm";
import { callbackify } from "util";
import { getParseTreeNode } from "typescript";

export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      myMsgs: [],
      messages: [],
      input: "",
      minimized: true //Default position for chat window,
      // contactForm: true
    };
    //reference to the newest message in the message window
    this.newMessage = React.createRef();
    this.updateState = this.updateState.bind(this);
    this.myMessage = this.myMessage.bind(this);
    this.setName = this.setName.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.toggleChatWindow = this.toggleChatWindow.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.pressedEnter = this.pressedEnter.bind(this);
    this.showChat = this.showChat.bind(this);

    this.talkoClient = new TalkoClient(this.updateState, this.myMessage);
  }

  componentDidMount() {
    this.talkoClient.start();
  }

  updateState(m) {
    console.log(m);
    this.setState({ messages: [...this.state.messages, m] });
  }

  myMessage(m) {
    this.setState({
      myMsgs: [...this.state.myMsgs, this.state.messages.length]
    });
    this.updateState(m);
  }

  setName(name) {
    this.talkoClient.name = name;
    this.talkoClient.offer();
    this.forceUpdate();
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

  //Minimizes or maximizes the chat window
  toggleChatWindow() {
    this.setState({
      minimized: !this.state.minimized
    });
  }

  //User input to send messages
  handleInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  //Adds the message to the messages array in state
  sendMessage() {
    console.log("SENT: " + this.state.input);
    this.talkoClient.sendMessage(this.state.input);

    this.setState({
      input: ""
    });
  }

  pressedEnter(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  showChat() {
    this.setState({ contactForm: false });
  }

  render() {
    //Theme object holds css values that are passed into the theme provider
    const theme = {};

    //Switch determines what values are held by the theme object based on the selected theme
    switch (this.props.theme) {
      case "light":
        theme.minimizedBackgroundColor = "#fff";
        theme.maximizedBackground = "#fff";
        theme.color = "#0d0d0d";
        theme.input = "lightgray";
        theme.header = "#efefef";
        theme.headerTitleColor = "#000";
        theme.messageColor = "#575757";
        theme.nameColor = "#000";
        theme.profileBoxShadowColor = "#eeecec";
        theme.profileBoxShadowSpread = "1px";
        theme.inputWindowBorderColor = "#efefef";
        theme.sendButton = sendButtonBlack;
        break;
      case "dark":
        theme.minimizedBackgroundColor = "#1c1c1c";
        theme.maximizedBackground = "#1c1c1c";
        theme.color = "white";
        theme.input = "lightgray";
        theme.header = "000";
        theme.headerTitleColor = "#fff";
        theme.messageColor = "#fff";
        theme.profileBackground = "#1c1c1c";
        theme.profileBoxShadowColor = "transparent";
        theme.profileBoxShadowSpread = "-2px";
        theme.profileBorder = "solid 1px #4e5d61";
        theme.nameColor = "#fff";
        theme.titleColor = "#fff";
        theme.inputWindowBorderColor = "#4e5d61";
        theme.footerBackgroundColor = "#1c1c1c";
        theme.creditColor = "#fff";
        theme.sendButton = sendButtonWhite;
        break;
      default:
        console.log("default theme");
    }

    let dispMessages = this.state.messages.map((message, index) => {
      return (
        <Message key={index}>
          {this.state.myMsgs.includes(index) ? (
            <div
              style={{
                float: "right",
                "min-width": "50%",
                "max-width": "calc(100% - 30px)",
                border: "1px groove #33ff55",
                display: "inline-block",
                padding: "3px 3px 5px 3px",
                margin: "5px",
                // "background-color": "lightgreen",
                "border-radius": "40px 30px 0 40px",
                "box-shadow": "-3px 3px 6px #222222"
              }}
            >
              <p
                style={{
                  margin: "0px",
                  "text-align": "center",
                  fontSize: "10px",
                  fontWeight: "lighter"
                }}
              >
                {message.data.time && message.data.time}
                {/* <hr style={{ "border-color": "lightgreen" }} /> */}
              </p>
              <p
                style={{
                  "text-align": "center",
                  margin: "8px 12px 4px 12px",
                  fontSize: "14px",
                  fontWeight: "normal"
                }}
              >
                {message.data.content}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  "border-radius": "5px 5px 0 5px",
                  border: "2px inset #33ff55",
                  margin: "0px",
                  padding: "0px 5px",
                  float: "right",
                  fontWeight: "lighter"
                }}
              >
                {message.data.from.name}
              </p>
            </div>
          ) : (
            <div
              style={{
                float: "left",
                "min-width": "50%",
                "max-width": "calc(100% - 30px)",
                border: "1px groove #bbddff",
                display: "inline-block",
                padding: "3px 3px 5px 3px",
                margin: "5px",
                // "background-color": "lightblue",
                "border-radius": "30px 40px 40px 0",
                "box-shadow": "-3px 3px 6px #222222"
              }}
            >
              <p
                style={{
                  margin: "0px",
                  "text-align": "center",
                  fontSize: "10px",
                  fontWeight: "lighter"
                }}
              >
                {message.data.time && message.data.time}
                {/* <hr style={{ "border-color": "lightblue" }} /> */}
              </p>
              <p
                style={{
                  "text-align": "center",
                  margin: "8px 12px 4px 12px",
                  fontSize: "14px",
                  fontWeight: "normal"
                }}
              >
                {message.data.content}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  "border-radius": "5px 5px 5px 0",
                  border: "2px inset #bbddff",
                  margin: "0px",
                  padding: "0px 5px",
                  float: "left",
                  fontWeight: "lighter"
                }}
              >
                {message.data.from.name}
              </p>
            </div>
          )}
        </Message>
      );
    });

    return (
      <ThemeProvider theme={theme}>
        {this.state.minimized ? (
          <MinimizedChatWindow onClick={this.toggleChatWindow}>
            <div
              style={{
                fontSize: "10px",
                paddingLeft: "10px",
                color: "#575757"
              }}
            />
            <HeaderTitle>{this.props.headerTitle}</HeaderTitle>
            <MaximizeButton>&and;</MaximizeButton>
          </MinimizedChatWindow>
        ) : (
          <ChatWindow>
            <Header onClick={this.toggleChatWindow}>
              <HeaderTitle>{this.props.headerTitle}</HeaderTitle>
              <MinimizeButton>&or;</MinimizeButton>
            </Header>

            <div>
              {this.talkoClient.name == "" && (
                <div
                  style={{
                    opacity: "0.5",
                    "z-index": 2,
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    "background-color": "rgba(0,0,0,0.5)",
                    borderRadius: "5px 5px 5px 5px"
                  }}
                />
              )}
              <Profile>
                <ProfileImage
                  style={{ "border-radius": "10px" }}
                  src={this.props.profileImage}
                />
                <div>
                  <Name>{this.props.name}</Name>
                  <Title>{this.props.title}</Title>
                </div>
                <Logo src={logo} />
              </Profile>
              <MessageWindow style={{ overflow: "auto" }}>
                {dispMessages} <div ref={this.newMessage} />
              </MessageWindow>
              {this.talkoClient.name == "" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      "z-index": "3",
                      position: "absolute",
                      top: "50%",
                      border: "2px outset gray",
                      boxShadow: "2px 2px 6px #333333"
                    }}
                  >
                    <ContactForm setName={this.setName} />
                  </div>
                  <InputWindow />
                </div>
              ) : (
                <InputWindow>
                  <Input
                    onChange={this.handleInput}
                    value={this.state.input}
                    placeholder="Type in your message here..."
                    onKeyPress={this.pressedEnter}
                  />
                  <SendButton
                    src={theme.sendButton}
                    onClick={this.sendMessage}
                  />
                </InputWindow>
              )}
              <Footer>
                <Credit>Powered by Talko.io</Credit>
              </Footer>
            </div>
          </ChatWindow>
        )}
      </ThemeProvider>
    );
  }
}

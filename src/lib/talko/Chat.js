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
  CustomerMessageWindow,
  CustomerName,
  CustomerTimeStamp,
  CustomerMessageContentContainer,
  CustomerMessageContent,
  RepMessageWindow,
  RepName,
  RepTimeStamp,
  RepMessageWindowContainer,
  RepMessageContent,
  Message,
  MaximizeButton,
  MinimizeButton,
  Footer,
  Credit
} from "./ChatComponents";
import ContactForm from "./ContactForm";

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
    //error handling for sending empty messages
    if (this.state.input === "") {
      return;
    }

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
            <CustomerMessageWindow>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CustomerName>{message.data.from.name}</CustomerName>
                <CustomerTimeStamp>
                  {message.data.time && message.data.time}
                </CustomerTimeStamp>
              </div>
              <CustomerMessageContentContainer>
                <CustomerMessageContent>
                  {message.data.content}
                </CustomerMessageContent>
              </CustomerMessageContentContainer>
            </CustomerMessageWindow>
          ) : (
            <RepMessageWindow>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RepName>{message.data.from.name}</RepName>
                <RepTimeStamp>
                  {message.data.time && message.data.time}
                </RepTimeStamp>
              </div>
              <RepMessageWindowContainer>
                <RepMessageContent>{message.data.content}</RepMessageContent>
              </RepMessageWindowContainer>
            </RepMessageWindow>
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
            {this.talkoClient.name == "" ? (
              <ContactForm setName={this.setName} />
            ) : (
              <div>
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
                <MessageWindow>
                  {dispMessages} <div ref={this.newMessage} />
                </MessageWindow>
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
                <Footer>
                  <Credit>Powered by Talko.io</Credit>
                </Footer>
              </div>
            )}
          </ChatWindow>
        )}
      </ThemeProvider>
    );
  }
}

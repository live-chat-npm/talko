import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import logo from "./images/logo.jpg";
import sendButtonBlack from "./images/send-button-black.png";
import sendButtonWhite from "./images/send-button-white.png";
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

export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      messages: ["Hello, how may we help you?"],
      input: "",
      minimized: true //Default position for chat window
    };
  }

  //reference to the newest message in the message window
  newMessage = React.createRef();

  componentDidUpdate() {
    if (this.newMessage.current) {
      this.scrollToBottom();
    }
  }

  //Keeps the message window scrolled to the newest message
  scrollToBottom = () => {
    this.newMessage.current.scrollIntoView();
  };

  //Minimizes or maximizes the chat window
  toggleChatWindow = () => {
    this.setState({
      minimized: !this.state.minimized
    });
  };

  //User input to send messages
  handleInput = e => {
    this.setState({
      input: e.target.value
    });
  };

  //Adds the message to the messages array in state
  sendMessage = () => {
    this.setState({
      messages: [...this.state.messages, this.state.input],
      input: ""
    });
  };

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
        theme.messageColor = "#575757";
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
        theme.profileBoxShadowColor = "black";
        theme.profileBoxShadowSpread = "-2px";
        theme.nameColor = "#fff";
        theme.titleColor = "#fff";
        theme.inputWindowBorderColor = "black";
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
          <p style={{ margin: "1px", fontSize: "10px", fontWeight: "lighter" }}>
            {this.props.name} {new Date().toLocaleTimeString()}
          </p>
          {message}
        </Message>
      );
    });

    return (
      <ThemeProvider theme={theme}>
        {this.state.minimized ? (
          <MinimizedChatWindow>
            <div
              style={{
                fontSize: "10px",
                paddingLeft: "10px",
                color: "#575757"
              }}
            />
            <HeaderTitle>{this.props.headerTitle}</HeaderTitle>
            <MaximizeButton onClick={this.toggleChatWindow}>
              &and;
            </MaximizeButton>
          </MinimizedChatWindow>
        ) : (
          <ChatWindow>
            <Header>
              <HeaderTitle>{this.props.headerTitle}</HeaderTitle>
              <MinimizeButton onClick={this.toggleChatWindow}>
                &or;
              </MinimizeButton>
            </Header>
            <Profile>
              <ProfileImage src={this.props.profileImage} />
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
              />
              <SendButton src={theme.sendButton} onClick={this.sendMessage} />
            </InputWindow>
            <Footer>
              <Credit>Powered by Talko.io</Credit>
            </Footer>
          </ChatWindow>
        )}
      </ThemeProvider>
    );
  }
}

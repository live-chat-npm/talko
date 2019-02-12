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

export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      input: "",
      minimized: true //Default position for chat window
    };

    this.talkoClient = new TalkoClient();

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.talkoClient.start(5050, this.updateState);
  }

  updateState(m) {
    this.setState({ messages: [...this.state.messages, m] });
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
    let msg = {
      time: new Date().toLocaleTimeString(),
      from: { id: 0, avatar: "", name: "React-Client" },
      content: this.state.input
    };

    this.talkoClient.sendMessage(msg);

    this.setState({
      input: ""
    });
  };

  pressedEnter = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
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
          <p style={{ margin: "1px", fontSize: "10px", fontWeight: "lighter" }}>
            {message.from.name}{" "}
            {message.time != undefined ? message.time : null}
          </p>
          {message.content}
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
                onKeyPress={this.pressedEnter}
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

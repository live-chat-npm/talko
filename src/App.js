import React, { Component } from "react";
import "./App.css";
// import Chat from "./Chat";
import { Chat } from 'talko-react';
import userImage from "./images/user-image.jpg";
import SessionHandler from './SessionHandler';

class App extends Component {
  render() {
    const sessionHandler = new SessionHandler();
    // console.log("handler", sessionHandler)
    console.log("chat", Chat)
    return (
      <div className="App">
        <Chat
          theme="light"
          profileImage={userImage}
          title="Manager"
          name="Alex Alec"
          headerTitle="Live Chat"
          sessionHandler={sessionHandler}
        />
      </div>
    );
  }
}

export default App;

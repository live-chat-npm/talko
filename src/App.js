import React, { Component } from "react";
import "./App.css";
import Chat from "./Chat";
import UserList from "./UserList"
import userImage from "./images/user-image.jpg";

class App extends Component {
  render() {
    // const sessionHandler = new SessionHandler();
    // console.log("handler", sessionHandler)
    console.log("chat", Chat)
    return (
      <div>
        <div className="App">
          <Chat
            theme="light"
            profileImage={userImage}
            title="Manager"
            name="Alex Alec"
            headerTitle="Live Chat"
          />
        </div>
        <UserList/>
      </div>
    );
  }
}

export default App;

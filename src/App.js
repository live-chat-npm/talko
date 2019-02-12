import React, { Component } from "react";

import "./App.css";

import Chat from "./Chat";
import UserList from "./UserList";
import userImage from "./images/user-image.jpg";

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Chat
            theme="light"
            profileImage={userImage}
            title="Manager"
            name="John Doe"
          />
        </div>
        <div className="Users">
            <UserList/>
        </div>
      </div>
    );
  }
}

export default App;

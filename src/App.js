import React, { Component } from "react";
import "./App.css";
import Chat from "./lib/talko/Chat";
import UserList from "./lib/talko/UserList";
import userImage from "./lib/talko/images/user-image.jpg";

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Chat
            theme="light"
            profileImage={userImage}
            title="Our very best coder!"
            name="John Thummel"
            headerTitle="Support Chat"
          />
        </div>
        <UserList />
      </div>
    );
  }
}

export default App;

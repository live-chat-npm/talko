import React, { Component } from "react";
import "./App.css";
import Chat from "./Chat";
import userImage from "./images/user-image.jpg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chat
          theme="light"
          profileImage={userImage}
          title="Manager"
          name="John Doe"
        />
      </div>
    );
  }
}

export default App;

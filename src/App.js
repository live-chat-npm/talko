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
          name="Alex Alec"
          headerTitle="Live Chat"
        />
      </div>
    );
  }
}

export default App;

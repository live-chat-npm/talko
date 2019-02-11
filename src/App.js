import React, { Component } from "react";
import "./App.css";
import Chat from "./Chat";
import userImage from "./images/user-image.jpg";
import io from 'socket.io-client';

class App extends Component {

  componentDidMount() {
    const socket = io('http://localhost:5050');
    // socket.on('connection')

    socket.on('greeting', res => console.log(res));
  }

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

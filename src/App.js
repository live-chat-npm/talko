import React, { Component } from "react";

import "./App.css";

import Chat from "./Chat";
import userImage from "./images/user-image.jpg";

// var app = require("express")();
// var http = require("http").Server(app);
// var io = require("socket.io")(http);

class App extends Component {
  // app.get("/", function(req, res) {
  //   res.sendFile(__dirname + "/index.html");
  // });
  // app.get("/", function(req, res) {
  //   res.send("<h1>Hello world</h1>");
  // });
  // http.listen(3000, function() {
  //   console.log("listening on *:3000");
  // });
  // io.on("connect", function(socket) {
  //   console.log("a user connected");
  // });
  // http.listen(3000, function() {
  //   console.log("listening on *:3000");
  // });

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

const io = require("socket.io");

var msg = "test";

var socket = io();

function sendM(msg) {
  //$("form").submit(function() {
  socket.emit("chat message", msg); //$("#m").val());
  //$("#m").val("");
}

function handleMsgs() {
  socket.on("connect", () => {
    console.log("CONNECTED!");
  });

  socket.on("chat message", function(msg) {
    console.log("> " + msg);
  });
}

module.exports = {
  sendM,
  handleMsgs
};

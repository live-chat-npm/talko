function newMessage(to, id, name, content) {
  this.data = {
    time: new Date().toUTCString(),
    room: to,
    from: { id: id, name: name },
    content: content
  };

  return this;
}
module.exports = {
  newMessage
};

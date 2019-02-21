function newMessage(to, id, name, content) {
  this.data = { time: new Date().toUTCString() };
  // this.data.time = ;
  this.data.room = to;
  this.data.from = { id: id, name: name };
  this.data.content = content;

  return this;
}
module.exports = {
  newMessage
};

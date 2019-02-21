export default class Message {
  constructor() {
    this.data = {
      time: null,
      room: null,
      from: {
        id: null,
        name: null
      },
      content: null
    };
  }

  newMessage(to, id, name, content) {
    this.data.time = new Date().toUTCString();
    this.data.room = to;
    this.data.from.id = id;
    this.data.from.name = name;
    this.data.content = content;

    return this;
  }
}

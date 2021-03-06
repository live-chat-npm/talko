export default class Message {
  constructor() {
    this.data = {
      time: undefined,
      room: undefined,
      from: {
        id: undefined,
        name: undefined
      },
      content: undefined
    };
  }

  newMessage(to, id, name, content) {
    this.data.time = new Date()
      .toLocaleString()
      .split("")
      .splice(10, 12)
      .join("");

    this.data.room = to;
    this.data.from.id = id;
    this.data.from.name = name;
    this.data.content = content;

    return this;
  }
}

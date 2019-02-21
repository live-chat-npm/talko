import React, { Component } from "react";
import { Form } from "./ChatComponents";

export default class ContactForm extends Component {
  state = {
    name: ""
  };

  sendName = e => {
    e.preventDefault();
    console.log("name");

    this.props.showChat();
  };

  render() {
    return (
      <Form onSubmit={e => this.sendName(e)}>
        <input type="text" placeholder="Enter your name" />
        <input type="submit" />
      </Form>
    );
  }
}

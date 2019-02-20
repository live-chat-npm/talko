import React, { Component } from "react";
import { Form } from "./ChatComponents";

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  sendName = e => {
    e.preventDefault();

    this.props.setName(this.state.name);
    console.log("name: " + this.state.name);
    // console.log("name: "+this.state.name);
    // this.showChat();
  };

  render() {
    return (
      <Form onSubmit={e => this.sendName(e)}>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        <input type="submit" />
      </Form>
    );
  }
}

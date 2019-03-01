import React, { Component } from "react";
import { Form } from "./ChatComponents";

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.sendName = this.sendName.bind(this);
  }

  sendName(e) {
    e.preventDefault();
    this.props.setName(this.state.name);
  }

  render() {
    return (
      <Form onSubmit={e => this.sendName(e)}>
        <div>
          <div
            style={{
              position: "relative",
              top: "70px",
              left: "200px",
              color: "red"
            }}
          >
            *
          </div>
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
            style={{ width: "200px", height: "30px", paddingLeft: "5px" }}
          />
        </div>
        <button
          style={{
            marginTop: "20px",
            width: "210px",
            height: "34px",
            backgroundColor: "#82C1E0",
            color: "white"
          }}
          type="submit"
        >
          Start Chat
        </button>
      </Form>
    );
  }
}

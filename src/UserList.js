import React, { Component } from "react";
import {UserListWindow, Header, UsersList, User} from "./ChatComponents";
import TalkoClient from "./client/TalkoClient";

class UserList extends Component {
  //userlist: ["Johnathan","Thomas", "John", "Troy"]
  constructor() {
    super();

    this.state = {
      messages: [],
      input: "",
      minimized: true, //Default position for chat window
      userlist: ["Johnathan","Thomas", "John", "Troy"]
    };

    this.talkoClient = new TalkoClient();

    this.updateState = this.updateState.bind(this);
  }
  
  componentDidMount() {
    this.talkoClient.start(5050, this.updateState);
  }

  updateState(m) {
    this.setState({ messages: [...this.state.messages, m] });
  }
  
  render() {
    var roster = this.state.userlist.map(client => <User>{"Status: " + client}</User>)
    return (
    <UserListWindow>
          <Header>
            <div style={{ fontSize: "10px", paddingLeft: "10px" }}>
              <h1>Customers</h1>
            </div>
          </Header>
        <UsersList>{roster}</UsersList>

    </UserListWindow>
    );
  }
}

export default UserList;

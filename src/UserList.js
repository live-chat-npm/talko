import React, { Component } from "react";
import {UserListWindow, Header, UsersList, User} from "./ChatComponents";

class UserList extends Component {
  constructor() {
    super();

    this.state = {
      userlist: ["Johnathan","Thomas", "John", "Troy"]
    };
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

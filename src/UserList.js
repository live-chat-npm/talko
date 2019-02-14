import React, { Component } from "react";
import {UserListWindow, Header, UsersList, User} from "./ChatComponents";

class UserList extends Component {

  constructor() {
    super()
    this.state = {
      tabs: [],
      chatHistory: [";lasdj;lsjf","l;kas;lkjf", "iouigoiu"],
      customerList: ["Customer 1","Customer 2", "Customer 3", "Customer 4"]
    };
  }
  createTab = (customer) => {
    this.setState({tabs: [...this.state.tabs, customer]});
  }
  acceptCustomer = () => {
    //Accepts the customer.
  };
  
  render() {
    let chatHistory = this.state.chatHistory.map((history,index) =>{
      return <div key={index}>{history}</div>
    })
    let selectTabs = this.state.tabs.map((tab, index) => {
      return (<div key={index} style={{position:"absolute", top:0, right:0,border:"solid 2px black"}}>
        {tab}
      </div>)
    })
    var roster = this.state.customerList.map((customer, index) => {
    return <User key={index} onClick = {() => this.createTab(customer)}>{"Status: " + customer}</User>
    })
    return (
      <div>
      <UserListWindow>
            <Header>
              <div style={{ fontSize: "10px", paddingLeft: "10px" }}>
                <h1>Customers</h1>
              </div>
            </Header>
          <UsersList>{roster}</UsersList>
          <button onClick={this.acceptCustomer} >Accept</button>
      </UserListWindow>
      <div>
        {selectTabs}
      </div>
        <div>
          {chatHistory}
        </div>
      <div>
        <input/>
        <button>Send</button>
      </div>
    </div>
    );
  }
}

export default UserList;

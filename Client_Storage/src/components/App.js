import React, { Component } from "react";
import Login from "./Login";
import SignUp from "./Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: true,
    };
  }

  render() {
    return <>{this.state.newUser ? <Login /> : <SignUp />}</>;
  }
}

export default App;

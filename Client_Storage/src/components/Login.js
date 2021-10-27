import React, { Component } from "react";
import "../styles/style.css";
import "../styles/signup.css";
import axios from "axios";
import Profile from "./Profile";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      pass: "",
      isLoggedIn: false,
      signUp: true,
      firstName: "",
      lastName: "",
    };
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleUName = this.handleUName.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleUName2 = this.handleUName2.bind(this);
    this.handlePass2 = this.handlePass2.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleFN = this.handleFN.bind(this);
    this.handleLN = this.handleLN.bind(this);
  }

  handleUName(e) {
    this.setState(
      {
        uname: e.target.value,
      },
      () => console.log(this.state.uname)
    );
  }

  handlePass(e) {
    this.setState({
      pass: e.target.value,
    });
  }

  handleUName2(e) {
    this.setState(
      {
        uname: e.target.value,
      },
      () => console.log(this.state.uname)
    );
  }

  handlePass2(e) {
    this.setState({
      pass: e.target.value,
    });
  }

  handleFN(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  handleLN(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  handleSignUp(e) {
    this.setState({
      signUp: !this.state.signUp,
    });
  }

  async handleSubmitLogin() {
    let user = {
      uname: this.state.uname,
      pass: this.state.pass,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch("/authenticate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          this.setState({
            isLoggedIn: true,
          });
        }
      });
  }

  async handleSubmitSignUp() {
    let user2 = {
      uname: this.state.uname,
      pass: this.state.pass,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    console.log(user2);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user2),
    };
    fetch("/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          this.setState({
            isLoggedIn: true,
          });
        }
      });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const isSignUpClicked = this.state.signUp;

    return (
      <div>
        {isLoggedIn ? (
          <Profile uname={this.state.uname} />
        ) : (
          <div>
            {isSignUpClicked ? (
              <div className="loginbox">
                <h1>Login Page</h1>
                <p> User name </p>
                <input
                  type="text"
                  name="uname"
                  id="uname"
                  placeholder="Please Enter Username"
                  onChange={this.handleUName}
                  required
                />
                <p> Password</p>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder="Please Enter Password"
                  onChange={this.handlePass}
                  required
                />
                <br />
                <input
                  type="submit"
                  id="login"
                  name="login"
                  value="Login"
                  onClick={this.handleSubmitLogin}
                />
                <input
                  type="submit"
                  id="login"
                  name="login"
                  value="Sign Up"
                  onClick={this.handleSignUp}
                />
                <br />

                <br />
              </div>
            ) : (
              <div className="signup">
                <h1>Sign up</h1>
                <p> First Name </p>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Please enter your First Name"
                  onChange={this.handleFN}
                  required
                />
                <p> Last Name </p>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Please enter your Last Name"
                  onChange={this.handleLN}
                  required
                />
                <p> Username </p>
                <input
                  type="text"
                  name="uname2"
                  id="uname2"
                  placeholder="Please enter Username"
                  onChange={this.handleUName2}
                  required
                />
                <p> Password</p>
                <input
                  type="password"
                  name="pass2"
                  id="pass2"
                  placeholder="Please enter Password"
                  onChange={this.handlePass2}
                  required
                />
                <br />
                <input
                  type="submit"
                  id="signup"
                  name="signup"
                  value="Sign Up"
                  onClick={this.handleSubmitSignUp}
                />
                <br />
                <button onClick={this.handleSignUp}>Login</button>
                <br />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Login;

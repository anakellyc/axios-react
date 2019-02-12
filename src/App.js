import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import UserForm from "./components/UserForm";

class App extends Component {
  state = {
    repos: null,
    name: null
  };
  getUser = e => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    if (user) {
      axios.get(`https://api.github.com/users/${user}`).then(res => {
        const repos = res.data.public_repos;
        const name = res.data.name;
        this.setState({ repos, name });
      });
    } else return;
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">HTTP calls in React</h1>
        </header>
        <UserForm getUser={this.getUser} />
        {this.state.repos ? (
          <div>
            <p>Name: {this.state.name}</p>
            <p>Number of repos: {this.state.repos}</p>
          </div>
        ) : (
          <p>Please submit a valid username</p>
        )}
      </div>
    );
  }
}

export default App;

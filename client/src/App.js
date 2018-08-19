import React, { Component } from 'react';
import logo from './logo.svg';
import './compiled/App.css';
import {fetchTokenStatistics} from "./redux/tokens/creators";
import {connect} from "react-redux";

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTokenStatistics('test');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.

        </p>
        <p>{this.state.message || 'No message'}</p>
      </div>
    );
  }
}

export default connect(
  null,
  {fetchTokenStatistics}
)(App);

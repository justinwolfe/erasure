import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HelloHooks from './HelloHooks'
import HelloHooks2 from './HelloHooks2'
class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloHooks />
        <HelloHooks2 />
      </div>
    );
  }
}

export default App;

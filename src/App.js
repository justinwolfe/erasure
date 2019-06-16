import React, { Component } from 'react';

import './App.css';
import HelloHooks from './HelloHooks'
// import HelloHooks2 from './HelloHooks2'
import Example from './Example'
class App extends Component {
  render() {
    return (
      <div className="App">
        <HelloHooks />
        <Example />
      </div>
    );
  }
}

export default App;

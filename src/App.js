import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withSingleUrlLoader } from './lib/datasource.js';
import {Dialog} from '@material-ui/core';

const withTestJson = withSingleUrlLoader;//('https://reqres.in/api/unknown');

const JsonText = withTestJson(
  props => <p>{JSON.stringify(props.data)}</p>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <JsonText url='https://reqres.in/api/unknown'/>

          <Dialog />

        </header>

        
      </div>
    );
  }
}

export default App;

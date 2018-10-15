import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { withSingleUrlLoader } from './lib/datasource.js';
// import { GeneralSettings, withSettingsDialog, withWidget } from './lib/widgetbase.js'
import TableWidget from './lib/tablewidget';

const withTestJson = withSingleUrlLoader; //('https://reqres.in/api/unknown');

// const JsonText = withTestJson(
//   props => <p>{JSON.stringify(props.data)}</p>
// );

// const DummyWidget = props => (<div>{JSON.stringify(props)}</div>);
// const TestWidget = withWidget(
//   DummyWidget, GeneralSettings
// );

class App extends Component {
  render() {
    return (
      <div className="App">
        <TableWidget />
      </div>
    );
  }
}

export default App;

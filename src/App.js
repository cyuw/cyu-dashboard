import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withSingleUrlLoader } from './lib/datasource.js';
import { GeneralSettings, withSettingsDialog, withWidget } from './lib/widgetbase.js'


const withTestJson = withSingleUrlLoader;//('https://reqres.in/api/unknown');

const JsonText = withTestJson(
  props => <p>{JSON.stringify(props.data)}</p>
);

const SettingDialog = withSettingsDialog(GeneralSettings);

const DummyWidget = props => (<div>{JSON.stringify(props)}</div>);
const TestWidget = withWidget(
  DummyWidget, GeneralSettings
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
        </header>
        <SettingDialog isDialogOpen={false} 
        onSaveSettings={settings => console.log(settings)}/>

        <TestWidget />


      </div>
    );
  }
}

export default App;

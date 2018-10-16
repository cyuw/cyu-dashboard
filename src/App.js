import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import logo from './logo.svg';
import './App.css';
import { withSingleUrlLoader } from './lib/datasource.js';
// import { GeneralSettings, withSettingsDialog, withWidget } from './lib/widgetbase.js'
import TableWidget from './lib/tableWidget';

// const withTestJson = withSingleUrlLoader; //('https://reqres.in/api/unknown');

// const JsonText = withTestJson(
//   props => <p>{JSON.stringify(props.data)}</p>
// );

// const DummyWidget = props => (<div>{JSON.stringify(props)}</div>);
// const TestWidget = withWidget(
//   DummyWidget, GeneralSettings
// );

const materialUiTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={materialUiTheme}>
        <div className="App">
          <TableWidget isEditable={true} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

import React from 'react';
import { AgGridReact, SortableHeaderComponent } from 'ag-grid-react';

import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import {
  Tab,
  Tabs,
  Select,
  MenuItem,
  FormControl,
  TextField
} from '@material-ui/core';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

import { withWidget, GeneralSettings, TabContainer } from './widgetBase';

class TableWidgeSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  onTablePropsChange(newJson) {
    this.props.onSettingsChange('tablePropsStr', newJson);
  }

  handleTabChange = (event, tabIndex) => {
    this.setState({ tabIndex: tabIndex });
  };

  render() {
    return (
      <div>
        <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
          <Tab label="General" />
          <Tab label="Datasource" />
          <Tab label="Table" />
        </Tabs>
        {this.state.tabIndex === 0 && (
          <TabContainer>
            <TextField
              id="title"
              label="Title"
              value={this.props.settings.title}
              onChange={event =>
                this.props.onSettingsChange('title', event.target.value)
              }
              margin="normal"
            />
          </TabContainer>
        )}
        {this.state.tabIndex === 1 && (
          <TabContainer>
            <FormControl>
              <Select
                value={this.props.settings.datasource}
                onChange={event =>
                  this.props.onSettingsChange('datasource', event.target.value)
                }
              >
                <MenuItem value="url">Plain URL</MenuItem>
                <MenuItem value="python">Python</MenuItem>
              </Select>
            </FormControl>
          </TabContainer>
        )}
        {this.state.tabIndex === 2 && (
          <TabContainer>
            <AceEditor
              mode="json"
              theme="github"
              name="tableProsEditor"
              value={this.props.settings.tablePropsStr}
              onChange={this.onTablePropsChange.bind(this)}
            />
          </TabContainer>
        )}
      </div>
    );
  }
}
TableWidgeSettings.defaultProps = {
  settings: {
    tablePropsStr: '{"enableSorting": true}'
  }
};

class TableWidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          width: 60,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true,
          pinned: true
        },
        { headerName: 'Make', field: 'make', filter: 'text' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]
    };
    this.onGridReady = this.onGridReady.bind(this);
  }

  onGridReady = params => {
    this.api = params.api;
    this.columnApi = params.columnApi;
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px'
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          onGridReady={this.onGridReady}
          gridOptions={JSON.parse(this.props.tablePropsStr)}
        />
      </div>
    );
  }
}

const TableWidget = withWidget(TableWidgetComponent, TableWidgeSettings);

export default TableWidget;

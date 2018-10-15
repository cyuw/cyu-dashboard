import React from 'react';
import { AgGridReact, SortableHeaderComponent } from 'ag-grid-react';

import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';

import { withWidget, GeneralSettings } from './widgetbase';
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';

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
        { headerName: 'Make', field: 'make', sortable: true, filter: 'text' },
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
    console.log(params);
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
          rowSelection="multiple"
          enableColResize
          // setting default column properties
          defaultColDef={{
            headerComponentFramework: SortableHeaderComponent,
            headerComponentParams: {
              menuIcon: 'fa-bars'
            }
          }}
        />
      </div>
    );
  }
}

const TableWidget = withWidget(TableWidgetComponent, GeneralSettings);

export default TableWidget;

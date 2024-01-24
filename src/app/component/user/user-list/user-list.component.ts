import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellClickedEvent, GridReadyEvent, GridApi, CellValueChangedEvent, RowValueChangedEvent } from 'ag-grid-community';
import { HttpProviderService } from 'src/app/service/http-provider.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  gridApi!: GridApi;

  columnDefs: ColDef[] = [
    { field: 'name' },
    {
      headerName: "Email(Immutable)",
      field: 'email',
      editable: false
    },
    { 
      field: 'gender',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Male', 'Female'],
      }
    },
    {
      field: 'age'
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    editable: true,
  };
  
  rowData: any[] = [];

  editType: 'fullRow' = 'fullRow';

  selectedRowIndex: number = 0;

  selectedUser: any = {};

  errorMessage: string = '';

  constructor(private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  getAllUsers(): void {
    this.httpProvider.getAllUsers()
      .subscribe(
        data => {
          this.rowData = data.body;
        }
      )
  }

  onCellClicked( e: CellClickedEvent): void {
    // console.log('cellClicked', e);
    this.selectedRowIndex = e.rowIndex??0;
    this.selectedUser = e.data??{};
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log(
      'onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue
    );
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    var user = event.data;

    if(user.age < 18) {
      this.errorMessage = "Age must be 18.";
      return;
    }

    this.httpProvider.updateUser(user.id, user)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onBtStartEditing() {
    this.errorMessage = '';
    this.gridApi.setFocusedCell(1, 'name');
    this.gridApi.startEditingCell({
      rowIndex: this.selectedRowIndex,
      colKey: 'name',
    });
  }

  

  removeRow() {
    if(this.selectedUser.id == undefined) {
      this.errorMessage = "Please select user to delete.";
      return;
    }

    this.rowData.splice(this.selectedRowIndex, 1);
    this.agGrid.api.setRowData(this.rowData);

    this.httpProvider.deleteUser(this.selectedUser.id)
      .subscribe(
        data => {
          console.log(data);
          this.selectedUser = {};
        }
      );
  }
}

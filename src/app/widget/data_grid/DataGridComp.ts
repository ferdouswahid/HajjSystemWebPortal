import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {map, Observable, of, tap} from "rxjs";
import {CellClickedEvent, ColDef, GridReadyEvent} from 'ag-grid-community';
import {AgGridAngular, AgGridModule} from "ag-grid-angular";
import {ButtonCellRendererComp} from "./button_cell_renderer/ButtonCellRendererComp";
import { Page } from '../../dto/Page';
import { ApiResponse } from '../../util/ApiResponse';

@Component({
  selector: 'DataGridComp',
  standalone: true,
  imports: [CommonModule, AgGridModule, ButtonCellRendererComp],
  template: `
      <!--<button (click)="clearSelection()">Clear Selection</button>-->
      <ag-grid-angular
        style="width: 100%; height: 500px; max-height: 800px;"
        class="ag-theme-alpine"
        [columnDefs]="colDefList"
        [defaultColDef]="defaultColDef"
        [rowData]="list1"
        [rowSelection]="'multiple'"
        [animateRows]="true"
        (gridReady)="onGridReady($event)"
        (cellClicked)="onCellClicked($event)"></ag-grid-angular>
  `,
  styleUrl: './DataGridComp.scss'
})
export class DataGridComp implements OnInit, OnChanges{

  @Input() page: Page<any> | null = null;
  @Input() colDefList: Array<ColDef> = [];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  list1: Array<any> | null = [];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor() {
  }

  ngOnInit(): void {    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'] && changes['page'].currentValue) { 
      //console.log('on change ', changes['dataPage'].currentValue);
      const dataPageT: Page<any> | null = changes['page'].currentValue;
      this.list1 = dataPageT ? dataPageT.content: [];        
    }
  }

  onGridReady(params: GridReadyEvent) {
    //console.log("calling")
  }

  onCellClicked(e: CellClickedEvent): void {
    //console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}

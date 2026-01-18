import {
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageChangedEvent, PaginationModule } from "ngx-bootstrap/pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Page } from "../../dto/Page";
import { Pageable } from '../../dto/Pageable';
import { ApiResponse } from '../../util/ApiResponse';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DataGridComp } from '../data_grid/DataGridComp';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColDef } from 'ag-grid-community';
import { PaginationComp } from '../pagination/PaginationComp';

// warpper for Datagrid and Pagination
@Component({
  selector: 'DatagridWithPaginationComp',
  standalone: true,
  imports: [CommonModule,
    DataGridComp,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    PaginationComp,
    NgSelectModule
  ],
  template: `
    <div class="row">
      <div class="col-md-12">
        <DataGridComp [page]="page" [colDefList]="colDefList"></DataGridComp>
      </div>
      <div class="col-md-3">
        Items Per Page <ng-select 
              [items]="showItemPerPage" [(ngModel)]="selected" 
              (change)="onChangeShowItemPerPage($event)"></ng-select>
      </div>
      <div class="col-md-9">
        <PaginationComp [page]="page" 
          (newSearchEmitter)="newSearchFn($event)"></PaginationComp>
      </div>
    </div>  
  `,
})
export class DatagridWithPaginationComp implements OnInit, OnChanges {

  selected = 10;
  onChangeShowItemPerPage($event: any) {
      console.log($event);      
  }

  @Input() pageAr: ApiResponse<Page<any>> | null = null;
  @Input() colDefList: ColDef[] = []

  page: Page<any> | null = null;

  @Output() newSearch = new EventEmitter<PageChangedEvent>();
 
  showItemPerPage: Array<number> = [2, 5, 10, 15, 20, 25, 50, 100];
  
  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['pageAr'] && changes['pageAr'].currentValue) {
      if (changes['pageAr'].currentValue['data']) {
        this.page = changes['pageAr'].currentValue['data'];
      } else {
        this.page = new Page<any>({ content: [], 
          pageable: new Pageable({ pageNumber: 0, pageSize: 0 }) });
      }
      this.cdr.detectChanges();
    }    
  }

  ngOnInit(): void {
  }

  newSearchFn (pageChangedEvent: PageChangedEvent) {
    this.newSearch.emit(pageChangedEvent)
  }

}

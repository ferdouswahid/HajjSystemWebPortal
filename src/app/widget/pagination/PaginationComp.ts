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
import { FormsModule } from "@angular/forms";
import { Page } from "../../dto/Page";
import { Pageable } from '../../dto/Pageable';
import { ApiResponse } from '../../util/ApiResponse';

@Component({
  selector: 'PaginationComp',
  standalone: true,
  imports: [CommonModule, PaginationModule, FormsModule],
  template: `
    <!-- totalItems  : total page; currentPage : current page;
      itemPerPage : item per page -->
    <pagination class="mt-3 px-2"
                [maxSize]="maxSize"
                [itemsPerPage]="pageInternal ? pageInternal.size : 0"
                [boundaryLinks]="true"
                [totalItems]="pageInternal ? pageInternal.totalElements : 0"
                [rotate]="true"
                [ngModel]="pageInternal ? pageInternal.pageable.pageNumber + 1 : 0"
                [disabled]="false"
                (pageChanged)="onPageChangeFn($event)">
    </pagination>
  `,
})
export class PaginationComp implements OnInit, OnChanges {

  maxSize: number = 0;  // number of page show in pagination at a time

  @Input() page: Page<any> | null = null;
  
  pageInternal: Page<any> | null = null;

  @Output() newSearchEmitter = new EventEmitter<PageChangedEvent>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['page'] && changes['page'].currentValue) {
        this.pageInternal = changes['page'].currentValue;
               
        this.cdr.detectChanges();
    }
    /*if( changes['totalItems'] && changes['totalItems'].previousValue != changes['totalItems'].currentValue ) {
      this.totalItems = changes['totalItems'].currentValue;
    }
    if( changes['itemPerPage'] && changes['itemPerPage'].previousValue != changes['itemPerPage'].currentValue ) {
      this.itemPerPage = changes['itemPerPage'].currentValue;
    }
    if( changes['currentPage'] && changes['currentPage'].previousValue != changes['currentPage'].currentValue ) {
      setTimeout(()=>{ this.currentPage = changes['currentPage'].currentValue  },25)
    }*/    
  }

  ngOnInit(): void {
    this.maxSize = 15;
    this.cdr.detectChanges();
  }

  onPageChangeFn(pageChangedEvent: PageChangedEvent) {
    this.newSearchEmitter.emit(
      {page: pageChangedEvent.page - 1, itemsPerPage: pageChangedEvent.itemsPerPage})
  }

}

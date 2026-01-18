import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { DataGridComp } from '../../../widget/data_grid/DataGridComp';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { PaginationComp } from '../../../widget/pagination/PaginationComp';
import { NgSelectModule } from '@ng-select/ng-select';
import { map, Observable, of, tap } from 'rxjs';
import { AppConfigInfo } from '../../../entity/AppConfigInfo';
import { ColDef } from 'ag-grid-community';
import { ButtonCellRendererComp } from '../../../widget/data_grid/button_cell_renderer/ButtonCellRendererComp';
import { AppConfigInfoController } from '../../../controller/AppConfigInfoController';
import { AppConfigInfoSearchDto } from '../../../dto/AppConfigInfoSearchDto';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Page } from '../../../dto/Page';

@Component({
  selector: 'AppSetupComp',
  templateUrl: 'AppSetupComp.html',
  styleUrls: ['AppSetupComp.scss'],
  standalone: true,
  imports: [CommonModule,
    MatTabsModule,
    DataGridComp,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    PaginationComp,
    NgSelectModule]
})

export class AppSetupComp implements OnInit {

  appConfigInfoFg: FormGroup = this.rxFormBuilder.formGroup(AppConfigInfo);
  appConfigInfoSearchFg: FormGroup = this.rxFormBuilder.formGroup(AppConfigInfo);
  appConfigInfoList$: Observable<Array<AppConfigInfo>> = of([]);
  showItemPerPage: Array<number> = [10, 15, 20, 25];
  appConfigInfoPage: Page<AppConfigInfo> = new Page<AppConfigInfo>();
  colDefList: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'enabled' },
    {
      headerName: '', editable: false, colId: 'action', width: 80,
      cellRenderer: ButtonCellRendererComp, pinned: 'left',
      cellStyle: { color: 'black', 'padding-left': '10px', 'padding-right': '0px' },
      cellRendererParams: {
        buttonLabel: 'Detail',
        buttonClass: 'btn btn-success mx-1 px-2 py-1 text-light',
        buttonOnClick: (param: any) => {
          this.viewDetail(param.data);
        }
      }
    },
    {
      headerName: '', editable: false, colId: 'action', width: 80,
      cellRenderer: ButtonCellRendererComp, pinned: 'left',
      cellStyle: { color: 'black', 'padding-left': '0px', 'padding-right': '0px' },
      cellRendererParams: {
        buttonLabel: 'Update',
        buttonClass: 'btn btn-info mx-1 px-2 py-1 text-light',
        buttonOnClick: (param: any) => {
          this.onUpdateClick(param.data);
        }
      }
    },
    {
      headerName: '', editable: false, colId: 'action', width: 80,
      cellRenderer: ButtonCellRendererComp, pinned: 'left',
      cellStyle: { color: 'black', 'padding-left': '0px', 'padding-right': '10px' },
      cellRendererParams: {
        buttonLabel: 'Delete',
        buttonClass: 'btn btn-danger mx-1 px-2 py-1 text-light',
        buttonOnClick: (param: any) => {
          this.onDeleteClick(param.data);
        }
      }
    },
  ];
  adminRoleController: any;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private appConfigInfoController: AppConfigInfoController
  ) { }

  ngOnInit(): void {
    this.search({ page: 0, itemsPerPage: this.appConfigInfoSearchFg.value['size'] });
  }

  save() {
    this.appConfigInfoController.save(this.appConfigInfoFg.value)
      .subscribe((e: AppConfigInfo) => {
        console.log(e);
        this.search({ page: 0, itemsPerPage: this.appConfigInfoSearchFg.value['size'] });
      });
  }

  onUpdateClick(appConfigInfo: any) {
    console.log('on update click', appConfigInfo)
    this.appConfigInfoFg.patchValue(appConfigInfo);
    this.appConfigInfoFg.patchValue({ updateMode: true });
  }

  update() {
    this.appConfigInfoController.update(this.appConfigInfoFg.value)
      .subscribe((e: AppConfigInfo) => {
        this.search({ page: 0, itemsPerPage: this.appConfigInfoSearchFg.value['size'] });
      });
  }

  onDeleteClick(data: any) {
    this.appConfigInfoController.delete(data)
      .subscribe((e) => { this.search({ page: 0, itemsPerPage: this.appConfigInfoSearchFg.value['size'] }); });
  }

  search(pageChangedEvent: PageChangedEvent) {
    this.appConfigInfoList$ = this.appConfigInfoController
      .search(new AppConfigInfoSearchDto({
        "idList": [],
        page: pageChangedEvent.page,
        size: pageChangedEvent.itemsPerPage
      }))
      .pipe(
        tap((e) => this.appConfigInfoPage = e),
        map(e => e.content));
  }

  searchByName(data: any) {
    console.log(data);
    this.appConfigInfoList$ = this.appConfigInfoController.search(new AppConfigInfoSearchDto({ 'idList': [] }))
      .pipe(
        map(e => e.content.filter((f) => f.name == data))
      );
    console.log(this.appConfigInfoList$);
  }

  viewDetail(data: any) {
    console.log('btn click', data)
  }

  reset() {
    this.appConfigInfoFg.reset();
  }

  cng($event: any) {
    console.log($event)
  }

  onChangeItemPerPage(event: any) {
    console.log(event);
    this.search({ page: 0, itemsPerPage: event });
  }

}

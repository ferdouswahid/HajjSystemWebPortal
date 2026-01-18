import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { VendorApiService } from '../../../service/api_services/VendorApiService';
import { CompanyApiService } from '../../../service/api_services/CompanyApiService';
import { NotificationService } from '../../../service/NotificationService';
import { VendorModel } from '../../../dto/VendorModel';
import { CompanyModel } from '../../../dto/CompanyModel';
import { Observable, tap } from 'rxjs';
import { VendorTypeEnum } from "../../../enum/VendorTypeEnum";
import { NgSelectModule } from "@ng-select/ng-select";

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './VendorComp.html',
  styleUrls: ['./VendorComp.scss'],
  providers: [VendorApiService, CompanyApiService]
})
export class VendorComp implements OnInit {
  vendorFg: FormGroup = this.rxFormBuilder.formGroup(VendorModel);
  vendorList: VendorModel[] = [];
  companyList$: Observable<Array<CompanyModel>> = new Observable<Array<CompanyModel>>();
  isEditMode = false;
  selectedVendorId: number | null = null;
  vendorTypes = Object.values(VendorTypeEnum);
  statuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED'];

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private vendorApiService: VendorApiService,
    private companyApiService: CompanyApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
    this.loadVendors();
  }

  loadCompanies(): void {
    this.companyList$ = this.companyApiService.getList();
  }

  loadVendors(): void {
    this.vendorApiService.getList()
      .pipe(
        tap((data: VendorModel[]) => {
          this.vendorList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load vendors');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.vendorFg.value;
    const model = new VendorModel(formValue);

    if (this.isEditMode && this.selectedVendorId) {
      model.id = this.selectedVendorId;
      this.vendorApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Vendor updated successfully');
          this.resetForm();
          this.loadVendors();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      this.vendorApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Vendor created successfully');
          this.resetForm();
          this.loadVendors();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.vendorFg.value.name) {
      this.notificationService.error('Name is required');
      return false;
    }
    if (!this.vendorFg.value.type) {
      this.notificationService.error('Type is required');
      return false;
    }
    if (!this.vendorFg.value.companyId) {
      this.notificationService.error('Company ID is required');
      return false;
    }
    return true;
  }

  editVendor(vendor: VendorModel): void {
    this.isEditMode = true;
    this.selectedVendorId = vendor.id;
    this.vendorFg.patchValue(vendor);
  }

  deleteVendor(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this vendor?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.vendorApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Vendor deleted successfully');
              this.loadVendors();
            },
            error: (err) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.vendorFg.reset();
    this.isEditMode = false;
    this.selectedVendorId = null;
  }

}

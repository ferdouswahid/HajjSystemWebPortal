import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PackageApiService } from '../../../service/api_services/PackageApiService';
import { NotificationService } from '../../../service/NotificationService';
import { AuthService } from '../../../service/AuthService';
import { ContractApiService } from '../../../service/api_services/ContractApiService';
import { PackageTypeModel } from '../../../dto/PackageTypeModel';
import { ContractModel } from '../../../dto/ContractModel';
import { PackageUpdateModel } from "../../../dto/PackageUpdateModel";
import { PackageModel } from "../../../dto/PackageModel";
import { PackageVehicleUpdateModel } from "../../../dto/PackageVehicleUpdateModel";
import {PackageTypeSearchModel} from '../../../dto/PackageTypeSearchModel';
import {PackageTypeApiService} from '../../../service/api_services/PackageTypeApiService';
import {VehicleApiService} from "../../../service/api_services/VehicleApiService";
import {VehicleDetailModel} from "../../../dto/VehicleDetailModel";
import {VehicleDetailSearchModel} from "../../../dto/VehicleDetailSearchModel";
import {ContractSearchModel} from "../../../dto/ContractSearchModel";
import {VehicleContractModel} from "../../../dto/VehicleContractModel";
import {PackageSearchModel} from "../../../dto/PackageSearchModel";

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule
  ],
  templateUrl: './PackageComp.html',
  styleUrls: ['./PackageComp.scss'],
  providers: [PackageApiService, ContractApiService, PackageTypeApiService, VehicleApiService]
})
export class PackageComp implements OnInit {
  packageFg: FormGroup = this.rxFormBuilder.formGroup(PackageUpdateModel);
  packageList: PackageModel[] = [];
  isEditMode = false;
  selectedPackageId: number | null = null;
  companyId: number | null = null;
  seasonId: number | null = null;

  packageTypes: PackageTypeModel[] = [];
  contracts: ContractModel[] = [];
  vehicleDetailModels: VehicleDetailModel[] = [];
  vehicleContractModels: VehicleContractModel[] = [];

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private packageApiService: PackageApiService,
    private contractApiService: ContractApiService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private packageTypeApiService: PackageTypeApiService,
    private vehicleApiService: VehicleApiService
  ) { }

  ngOnInit(): void {
    this.setValuesFromSecurity();
    this.loadPackages();
    this.loadDropdownData();
  }

  get packageVehicles() {
    return this.packageFg.get('packageVehicles') as FormArray;
  }

  loadPackages(): void {
    this.packageApiService.search(new PackageSearchModel({companyId: this.companyId}))
      .subscribe(data => this.packageList = data);
  }

  loadDropdownData(): void {
    this.contractApiService.search(new ContractSearchModel({companyId: this.companyId}))
      .subscribe(data => this.contracts = data);
    this.packageTypeApiService.search(
      new PackageTypeSearchModel({companyId: this.companyId})
    ).subscribe(data => this.packageTypes = data);
    this.vehicleApiService.search(
      new VehicleDetailSearchModel({companyId: this.companyId})
    ).subscribe(data => this.vehicleDetailModels = data);
  }

  setValuesFromSecurity(): void {
    const payload = this.authService.getJwtPayload();
    if (payload && payload.CompanyId && payload.SeasonId) {
      this.companyId = parseInt(payload.CompanyId, 10);
      this.seasonId = parseInt(payload.SeasonId, 10);
    } else {
      this.notificationService.error('Unable to determine user company or season');
    }
  }

  addDetail(): void {
    if (this.packageVehicles.length > 0) {
      const lastIndex = this.packageVehicles.length - 1;
      const lastDetail = this.packageVehicles.at(lastIndex) as FormGroup;

      if (lastDetail.invalid) {
        lastDetail.markAllAsTouched();

        const detailValue = lastDetail.value;
        const rowNum = this.packageVehicles.length;

        if (!detailValue.contractId) {
          this.notificationService.error(`Contract is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.vehicleContractId) {
          this.notificationService.error(`Vehicle contract is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.startDate) {
          this.notificationService.error(`Start Date is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.endDate) {
          this.notificationService.error(`End Date is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.cost) {
          this.notificationService.error(`Cost is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.price) {
          this.notificationService.error(`Price is required at row ${rowNum}`);
          return;
        }

        this.notificationService.error(`Please fill all required fields correctly at row ${rowNum}`);
        return;
      }
    }

    const detail = new PackageVehicleUpdateModel();
    detail.companyId = this.companyId;
    detail.seasonId = this.seasonId;
    this.packageVehicles.push(this.rxFormBuilder.formGroup(detail));
  }

  removeDetail(index: number, detail: AbstractControl): void {
    const idControl = detail.get('id');
    if (idControl && idControl.value) {
      this.deletePackageVehicle(idControl.value, index);
    } else {
      this.packageVehicles.removeAt(index);
    }
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }
    const model = new PackageUpdateModel(this.packageFg.value);
    if (this.isEditMode && this.selectedPackageId) {
      model.id = this.selectedPackageId;
      this.packageApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Package updated successfully');
          this.resetForm();
          this.loadPackages();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Update failed');
        }
      });
    } else {
      this.packageApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Package created successfully');
          this.resetForm();
          this.loadPackages();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Creation failed');
        }
      });
    }
  }

  validate(): boolean {
    this.packageFg.patchValue({ companyId: this.companyId, seasonId: this.seasonId });

    if (!this.packageFg.value.title) {
      this.notificationService.error('Title is required');
      return false;
    }
    if (!this.packageFg.value.packageTypeId) {
      this.notificationService.error('Package Type is required');
      return false;
    }
    if (!this.packageFg.value.startDate) {
      this.notificationService.error('Start Date is required');
      return false;
    }
    if (!this.packageFg.value.endDate) {
      this.notificationService.error('End Date is required');
      return false;
    }

    const details = this.packageFg.value.packageVehicles as any[];
    if (details && details.length > 0) {
      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        const rowNum = i + 1;
        if (!detail.contractId) {
          this.notificationService.error(`Contract is required at row ${rowNum}`);
          return false;
        }
        if (!detail.vehicleContractId) {
          this.notificationService.error(`Vehicle contract is required at row ${rowNum}`);
          return false;
        }
        if (!detail.startDate) {
          this.notificationService.error(`Start Date is required at row ${rowNum}`);
          return false;
        }
        if (!detail.endDate) {
          this.notificationService.error(`End Date is required at row ${rowNum}`);
          return false;
        }
        if (!detail.cost) {
          this.notificationService.error(`Cost is required at row ${rowNum}`);
          return false;
        }
        if (!detail.price) {
          this.notificationService.error(`Price is required at row ${rowNum}`);
          return false;
        }
      }
    }

    if (this.packageFg.invalid) {
      this.packageFg.markAllAsTouched();
      this.notificationService.error('Please fill all required fields correctly');
      return false;
    }
    return true;
  }

  editPackage(packageData: PackageModel): void {
    this.isEditMode = true;
    this.selectedPackageId = packageData.id;

    // Convert dates for bsDatepicker
    const packageFormData: any = {
      ...packageData,
      startDate: packageData.startDate ? new Date(packageData.startDate) : null,
      endDate: packageData.endDate ? new Date(packageData.endDate) : null
    };

    if (packageFormData.packageVehicles) {
      packageFormData.packageVehicles = packageFormData.packageVehicles.map((d: any) => ({
        ...d,
        startDate: d.startDate ? new Date(d.startDate) : null,
        endDate: d.endDate ? new Date(d.endDate) : null
      }));
    }

    this.vehicleContractModels = this.contracts.filter(i => i.id === packageData.packageVehicles[0].contractId)[0].vehicleContracts;

    // Reset and patch
    this.packageFg = this.rxFormBuilder.formGroup(PackageUpdateModel, packageFormData);
  }

  deletePackage(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this package?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.packageApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Package deleted successfully');
              this.loadPackages();
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  deletePackageVehicle(id: number | null, index: number): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this package vehicle?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.packageApiService.deletePackageVehicle(id).subscribe({
            next: () => {
              this.notificationService.success('Package vehicle deleted successfully');
              this.packageVehicles.removeAt(index);
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  resetForm(): void {
    this.packageFg = this.rxFormBuilder.formGroup(PackageUpdateModel);
    this.isEditMode = false;
    this.selectedPackageId = null;
  }

  onChangeContract(event: ContractModel): void {
    this.vehicleContractModels = event.vehicleContracts || [];
  }
}

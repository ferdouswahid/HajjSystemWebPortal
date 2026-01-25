import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { tap } from 'rxjs';
import { ContractApiService } from '../../../service/api_services/ContractApiService';
import { NotificationService } from '../../../service/NotificationService';
import { AuthService } from '../../../service/AuthService';
import { ContractType } from '../../../enum/ContractType';
import { VendorApiService } from '../../../service/api_services/VendorApiService';
import { VehicleApiService } from '../../../service/api_services/VehicleApiService';
import { VendorModel } from '../../../dto/VendorModel';
import { VehicleModel } from '../../../dto/VehicleModel';
import { ContractUpdateModel } from "../../../dto/ContractUpdateModel";
import { ContractModel } from "../../../dto/ContractModel";
import { VehicleContractUpdateModel } from "../../../dto/VehicleContractUpdateModel";
import {ContractSearchModel} from "../../../dto/ContractSearchModel";

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule
  ],
  templateUrl: './ContractComp.html',
  styleUrls: ['./ContractComp.scss'],
  providers: [ContractApiService, VendorApiService, VehicleApiService]
})
export class ContractComp implements OnInit {
  contractFg: FormGroup = this.rxFormBuilder.formGroup(ContractUpdateModel);
  contractList: ContractModel[] = [];
  isEditMode = false;
  selectedContractId: number | null = null;
  companyId: number | null = null;
  seasonId: number | null = null;

  vendors: VendorModel[] = [];
  vehicles: VehicleModel[] = [];
  contractTypes = Object.values(ContractType);

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private contractApiService: ContractApiService,
    private vendorApiService: VendorApiService,
    private vehicleApiService: VehicleApiService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setValuesFromSecurity();
    this.loadContracts();
    this.loadDropdownData();
  }

  get vehicleContracts() {
    return this.contractFg.get('vehicleContracts') as FormArray;
  }

  loadContracts(): void {
    const searchModel = new ContractSearchModel();
    searchModel.companyId = this.companyId;
    this.contractApiService.search(searchModel)
      .pipe(
        tap((data: ContractModel[]) => {
          this.contractList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load contracts');
        }
      });
  }

  loadDropdownData(): void {
    this.vendorApiService.getList().subscribe(data => this.vendors = data);
    this.vehicleApiService.getList().subscribe(data => this.vehicles = data);
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
    if (this.vehicleContracts.length > 0) {
      const lastIndex = this.vehicleContracts.length - 1;
      const lastDetail = this.vehicleContracts.at(lastIndex) as FormGroup;

      if (lastDetail.invalid) {
        lastDetail.markAllAsTouched();

        const detailValue = lastDetail.value;
        const rowNum = this.vehicleContracts.length;

        if (!detailValue.vehicleId) {
          this.notificationService.error(`Vehicle is required at row ${rowNum}`);
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
        if (!detailValue.agreedSeat) {
          this.notificationService.error(`Agreed Seat is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.price) {
          this.notificationService.error(`Price is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.status) {
          this.notificationService.error(`Status is required at row ${rowNum}`);
          return;
        }

        this.notificationService.error(`Please fill all required fields correctly at row ${rowNum}`);
        return;
      }
    }

    const detail = new VehicleContractUpdateModel();
    detail.companyId = this.companyId;
    detail.contractId = this.selectedContractId;
    this.vehicleContracts.push(this.rxFormBuilder.formGroup(detail));
  }

  removeDetail(index: number, detail: AbstractControl): void {
    const idControl = detail.get('id');
    if (idControl && idControl.value) {
      this.deleteVehicleContract(idControl.value, index);
    } else {
      this.vehicleContracts.removeAt(index);
    }
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const model = new ContractUpdateModel(this.contractFg.value);
    model.startDate = model.startDate ? new Date(model.startDate).toISOString().split('T')[0] : null;
    model.endDate = model.endDate ? new Date(model.endDate).toISOString().split('T')[0] : null;

    if (this.isEditMode && this.selectedContractId) {
      model.id = this.selectedContractId;
      this.contractApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Contract updated successfully');
          this.resetForm();
          this.loadContracts();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Update failed');
        }
      });
    } else {
      this.contractApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Contract created successfully');
          this.resetForm();
          this.loadContracts();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Creation failed');
        }
      });
    }
  }

  validate(): boolean {
    this.contractFg.patchValue({ companyId: this.companyId, seasonId: this.seasonId });

    if (!this.contractFg.value.vendorId) {
      this.notificationService.error('Vendor is required');
      return false;
    }
    if (!this.contractFg.value.contractType) {
      this.notificationService.error('Contract Type is required');
      return false;
    }
    if (!this.contractFg.value.startDate) {
      this.notificationService.error('Start Date is required');
      return false;
    }
    if (!this.contractFg.value.endDate) {
      this.notificationService.error('End Date is required');
      return false;
    }
    if (!this.contractFg.value.companyId) {
      this.notificationService.error('Company is required');
      return false;
    }
    if (!this.contractFg.value.seasonId) {
      this.notificationService.error('Season is required');
      return false;
    }

    const details = this.contractFg.value.vehicleContracts as any[];
    if (details && details.length > 0) {
      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        const rowNum = i + 1;
        if (!detail.vehicleId) {
          this.notificationService.error(`Vehicle is required at row ${rowNum}`);
          return false;
        }
        if (!detail.agreedSeat) {
          this.notificationService.error(`Agreed Seat is required at row ${rowNum}`);
          return false;
        }
        if (!detail.companyId) {
          this.notificationService.error(`Company is required at row ${rowNum}`);
          return false;
        }
      }
    }

    if (this.contractFg.invalid) {
      this.contractFg.markAllAsTouched();
      this.notificationService.error('Please fill all required fields correctly');
      return false;
    }
    return true;
  }

  editContract(contract: ContractModel): void {
    this.isEditMode = true;
    this.selectedContractId = contract.id;

    // Convert dates for bsDatepicker
    const contractData: any = {
      ...contract,
      startDate: contract.startDate ? new Date(contract.startDate) : null,
      endDate: contract.endDate ? new Date(contract.endDate) : null
    };

    if (contractData.vehicleContracts) {
      contractData.vehicleContracts = contractData.vehicleContracts.map((d: any) => ({
        ...d,
        startDate: d.startDate ? new Date(d.startDate) : null,
        endDate: d.endDate ? new Date(d.endDate) : null
      }));
    }

    // Reset and patch
    this.contractFg = this.rxFormBuilder.formGroup(ContractUpdateModel, contractData);
  }

  deleteContract(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this contract?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.contractApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Contract deleted successfully');
              this.loadContracts();
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  deleteVehicleContract(id: number | null, index: number): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this vehicle contract?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.contractApiService.deleteVehicleContract(id).subscribe({
            next: () => {
              this.notificationService.success('Vehicle contract deleted successfully');
              this.vehicleContracts.removeAt(index);
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  resetForm(): void {
    this.contractFg = this.rxFormBuilder.formGroup(ContractUpdateModel);
    this.isEditMode = false;
    this.selectedContractId = null;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { VehicleContractApiService } from '../../../service/api_services/VehicleContractApiService';
import { NotificationService } from '../../../service/NotificationService';
import { VehicleContractModel } from '../../../dto/VehicleContractModel';
import { tap } from 'rxjs';
import {NgSelectModule} from "@ng-select/ng-select";

@Component({
  selector: 'app-vehicle-contract',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    BsDatepickerModule,
    NgSelectModule
  ],
  templateUrl: './VehicleContractComp.html',
  styleUrls: ['./VehicleContractComp.scss'],
  providers: [VehicleContractApiService]
})
export class VehicleContractComp implements OnInit {
  vehicleContractFg: FormGroup = this.rxFormBuilder.formGroup(VehicleContractModel);
  vehicleContractList: VehicleContractModel[] = [];
  isEditMode = false;
  selectedVehicleContractId: number | null = null;
  statuses = ['ACTIVE', 'INACTIVE', 'EXPIRED', 'CANCELLED']; // need to clarify is this status should be enum or not

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private vehicleContractApiService: VehicleContractApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadVehicleContracts();
  }

  loadVehicleContracts(): void {
    this.vehicleContractApiService.getList()
      .pipe(
        tap((data: VehicleContractModel[]) => {
          this.vehicleContractList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load vehicle contracts');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.vehicleContractFg.value;
    const model = new VehicleContractModel(formValue);

    if (this.isEditMode && this.selectedVehicleContractId) {
      model.id = this.selectedVehicleContractId;
      this.vehicleContractApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Vehicle contract updated successfully');
          this.resetForm();
          this.loadVehicleContracts();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      this.vehicleContractApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Vehicle contract created successfully');
          this.resetForm();
          this.loadVehicleContracts();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.vehicleContractFg.value.vehicleId) {
      this.notificationService.error('Vehicle ID is required');
      return false;
    }
    if (!this.vehicleContractFg.value.startDate) {
      this.notificationService.error('Start Date is required');
      return false;
    }
    if (!this.vehicleContractFg.value.endDate) {
      this.notificationService.error('End Date is required');
      return false;
    }
    if (!this.vehicleContractFg.value.agreedSeat) {
      this.notificationService.error('Agreed Seat is required');
      return false;
    }
    if (!this.vehicleContractFg.value.serviceConditions) {
      this.notificationService.error('Service Conditions is required');
      return false;
    }
    if (!this.vehicleContractFg.value.status) {
      this.notificationService.error('Status is required');
      return false;
    }
    if (this.vehicleContractFg.value.price === null || this.vehicleContractFg.value.price === '') {
      this.notificationService.error('Price is required');
      return false;
    }
    return true;
  }

  editVehicleContract(contract: VehicleContractModel): void {
    this.isEditMode = true;
    this.selectedVehicleContractId = contract.id;
    this.vehicleContractFg.patchValue({
      vehicleId: contract.vehicleId,
      startDate: contract.startDate ? new Date(contract.startDate) : '',
      endDate: contract.endDate ? new Date(contract.endDate) : '',
      agreedSeat: contract.agreedSeat,
      serviceConditions: contract.serviceConditions,
      status: contract.status,
      price: contract.price,
      isEnabled: contract.isEnabled
    });
  }

  deleteVehicleContract(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this vehicle contract?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.vehicleContractApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Vehicle contract deleted successfully');
              this.loadVehicleContracts();
            },
            error: (err) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.vehicleContractFg.reset();
    this.isEditMode = false;
    this.selectedVehicleContractId = null;
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}

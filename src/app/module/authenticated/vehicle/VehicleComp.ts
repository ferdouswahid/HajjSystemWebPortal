import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { tap } from 'rxjs';
import { VehicleApiService } from '../../../service/api_services/VehicleApiService';
import { NotificationService } from '../../../service/NotificationService';
import { AuthService } from '../../../service/AuthService';
import { VehicleTypeEnum } from '../../../enum/VehicleTypeEnum';
import { TripTypeEnum } from '../../../enum/TripTypeEnum';
import { VendorApiService } from '../../../service/api_services/VendorApiService';
import { VehicleRouteApiService } from '../../../service/api_services/VehicleRouteApiService';
import { VendorModel } from '../../../dto/VendorModel';
import { VehicleRouteModel } from '../../../dto/VehicleRouteModel';
import {VehicleUpdateModel} from "../../../dto/VehicleUpdateModel";
import {VehicleModel} from "../../../dto/VehicleModel";
import {VehicleDetailUpdateModel} from "../../../dto/VehicleDetailUpdateModel";

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule
  ],
  templateUrl: './VehicleComp.html',
  styleUrls: ['./VehicleComp.scss'],
  providers: [VehicleApiService, VendorApiService, VehicleRouteApiService]
})
export class VehicleComp implements OnInit {
  vehicleFg: FormGroup = this.rxFormBuilder.formGroup(VehicleUpdateModel);
  vehicleList: VehicleModel[] = [];
  isEditMode = false;
  selectedVehicleId: number | null = null;
  companyId: number | null = null;

  vendors: VendorModel[] = [];
  routes: VehicleRouteModel[] = [];
  vehicleTypes = Object.values(VehicleTypeEnum);
  tripTypes = Object.values(TripTypeEnum);

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private vehicleApiService: VehicleApiService,
    private vendorApiService: VendorApiService,
    private routeApiService: VehicleRouteApiService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadDropdownData();
    this.setValueFromSecurity();
  }

  get vehicleDetails() {
    return this.vehicleFg.get('vehicleDetails') as FormArray;
  }

  loadVehicles(): void {
    this.vehicleApiService.getList()
      .pipe(
        tap((data: VehicleModel[]) => {
          this.vehicleList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load vehicles');
        }
      });
  }

  loadDropdownData(): void {
    this.vendorApiService.getList().subscribe(data => this.vendors = data);
    this.routeApiService.getList().subscribe(data => this.routes = data);
  }

  setValueFromSecurity(): void {
    const payload = this.authService.getJwtPayload();
    if (payload && payload.CompanyId) {
      this.companyId = parseInt(payload.CompanyId, 10);
    } else {
      this.notificationService.error('Unable to determine user company');
    }
  }

  addDetail(): void {
    if (this.vehicleDetails.length > 0) {
      const lastIndex = this.vehicleDetails.length - 1;
      const lastDetail = this.vehicleDetails.at(lastIndex) as FormGroup;

      if (lastDetail.invalid) {
        lastDetail.markAllAsTouched();

        const detailValue = lastDetail.value;
        const rowNum = this.vehicleDetails.length;

        if (!detailValue.routeFromId) {
          this.notificationService.error(`Route From is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.routeToId) {
          this.notificationService.error(`Route To is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.tripType) {
          this.notificationService.error(`Trip Type is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.price) {
          this.notificationService.error(`Price is required at row ${rowNum}`);
          return;
        }
        if (!detailValue.departureDate) {
          this.notificationService.error(`Departure Date is required at row ${rowNum}`);
          return;
        }


        this.notificationService.error(`Please fill all required fields correctly at row ${rowNum}`);
        return;
      }
    }

    const detail = new VehicleDetailUpdateModel();
    detail.companyId = this.companyId;
    this.vehicleDetails.push(this.rxFormBuilder.formGroup(detail));
  }

  removeDetail(index: number, detail: AbstractControl): void {
    const idControl = detail.get('id');
    if (idControl && idControl.value) {
      this.deleteVehicleDetail(idControl.value, index);
    } else {
      this.vehicleDetails.removeAt(index);
    }
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const model = new VehicleUpdateModel(this.vehicleFg.value);

    if (this.isEditMode && this.selectedVehicleId) {
      model.id = this.selectedVehicleId;
      this.vehicleApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Vehicle updated successfully');
          this.resetForm();
          this.loadVehicles();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Update failed');
        }
      });
    } else {
      this.vehicleApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Vehicle created successfully');
          this.resetForm();
          this.loadVehicles();
        },
        error: (err) => {
          this.notificationService.error(err.error?.message || 'Creation failed');
        }
      });
    }
  }

  validate(): boolean {
    this.vehicleFg.patchValue({companyId: this.companyId});

    if (!this.vehicleFg.value.licensePlate) {
      this.notificationService.error('License Plate is required');
      return false;
    }
    if (!this.vehicleFg.value.vehicleType) {
      this.notificationService.error('Vehicle Type is required');
      return false;
    }
    if (!this.vehicleFg.value.totalSeat) {
      this.notificationService.error('Total Seat is required');
      return false;
    }

    if (!this.vehicleFg.value.model) {
      this.notificationService.error('Model is required');
      return false;
    }

    if (!this.vehicleFg.value.year) {
      this.notificationService.error('Year is required');
      return false;
    }

    if (!this.vehicleFg.value.vendorId) {
      this.notificationService.error('Vendor is required');
      return false;
    }

    if (!this.vehicleFg.value.companyId) {
      this.notificationService.error('Company id is required');
      return false;
    }

    const details = this.vehicleFg.value.vehicleDetails as any[];
    if (details) {
      for (let i = 0; i < details.length; i++) {
        const detail = details[i];
        const rowNum = i + 1;
        if (!detail.routeFromId) {
          this.notificationService.error(`Route From is required at row ${rowNum}`);
          return false;
        }
        if (!detail.routeToId) {
          this.notificationService.error(`Route To is required at row ${rowNum}`);
          return false;
        }
        if (!detail.tripType) {
          this.notificationService.error(`Trip Type is required at row ${rowNum}`);
          return false;
        }
        if (!detail.price) {
          this.notificationService.error(`Price is required at row ${rowNum}`);
          return false;
        }
        if (!detail.departureDate) {
          this.notificationService.error(`Departure Date is required at row ${rowNum}`);
          return false;
        }

      }
    }

    if (this.vehicleFg.invalid) {
      debugger
      this.vehicleFg.markAllAsTouched();
      this.notificationService.error('Please fill all required fields correctly');
      return false;
    }
    return true;
  }

  editVehicle(vehicle: VehicleModel): void {
    this.isEditMode = true;
    this.selectedVehicleId = vehicle.id;

    // Convert dates for bsDatepicker
    if (vehicle.vehicleDetails) {
      vehicle.vehicleDetails = vehicle.vehicleDetails.map(d => ({
        ...d,
        departureDate: d.departureDate ? new Date(d.departureDate) : null,
        arrivalDate: d.arrivalDate ? new Date(d.arrivalDate) : null
      }));
    }

    // Reset and patch
    this.vehicleFg = this.rxFormBuilder.formGroup(VehicleModel, vehicle);
  }

  deleteVehicle(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this vehicle?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.vehicleApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Vehicle deleted successfully');
              this.loadVehicles();
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  deleteVehicleDetail(id: number | null, index: number): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.vehicleApiService.deleteVehicleDetail(id).subscribe({
            next: () => {
              this.notificationService.success('Vehicle detail deleted successfully');
              this.vehicleDetails.removeAt(index);
            },
            error: (err) => {
              this.notificationService.error(err.error?.message || 'Delete failed');
            }
          });
        }
      });
  }

  resetForm(): void {
    this.vehicleFg = this.rxFormBuilder.formGroup(VehicleModel);
    this.isEditMode = false;
    this.selectedVehicleId = null;
  }
}

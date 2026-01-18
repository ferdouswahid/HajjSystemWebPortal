import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { VehicleRouteApiService } from '../../../service/api_services/VehicleRouteApiService';
import { NotificationService } from '../../../service/NotificationService';
import { VehicleRouteModel } from '../../../dto/VehicleRouteModel';
import { tap } from 'rxjs';

@Component({
  selector: 'app-vehicle-route',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  templateUrl: './VehicleRouteComp.html',
  styleUrls: ['./VehicleRouteComp.scss'],
  providers: [VehicleRouteApiService]
})
export class VehicleRouteComp implements OnInit {
  vehicleRouteFg: FormGroup = this.rxFormBuilder.formGroup(VehicleRouteModel);
  vehicleRouteList: VehicleRouteModel[] = [];
  isEditMode = false;
  selectedVehicleRouteId: number | null = null;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private vehicleRouteApiService: VehicleRouteApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadVehicleRoutes();
  }

  loadVehicleRoutes(): void {
    this.vehicleRouteApiService.getList()
      .pipe(
        tap((data: VehicleRouteModel[]) => {
          this.vehicleRouteList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load vehicle routes');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.vehicleRouteFg.value;
    const model = new VehicleRouteModel(formValue);

    if (this.isEditMode && this.selectedVehicleRouteId) {
      model.id = this.selectedVehicleRouteId;
      this.vehicleRouteApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Vehicle route updated successfully');
          this.resetForm();
          this.loadVehicleRoutes();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      this.vehicleRouteApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Vehicle route created successfully');
          this.resetForm();
          this.loadVehicleRoutes();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.vehicleRouteFg.value.name) {
      this.notificationService.error('Name is required');
      return false;
    }
    return true;
  }

  editVehicleRoute(vehicleRoute: VehicleRouteModel): void {
    this.isEditMode = true;
    this.selectedVehicleRouteId = vehicleRoute.id;
    this.vehicleRouteFg.patchValue(vehicleRoute);
  }

  deleteVehicleRoute(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this vehicle route?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.vehicleRouteApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Vehicle route deleted successfully');
              this.loadVehicleRoutes();
            },
            error: (err) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.vehicleRouteFg.reset();
    this.isEditMode = false;
    this.selectedVehicleRouteId = null;
  }

}

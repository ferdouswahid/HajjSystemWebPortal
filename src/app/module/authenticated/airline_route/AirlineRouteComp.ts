import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AirlineRouteApiService } from '../../../service/api_services/AirlineRouteApiService';
import { NotificationService } from '../../../service/NotificationService';
import { AirlineRouteModel } from '../../../dto/AirlineRouteModel';
import { tap } from 'rxjs';

@Component({
  selector: 'app-airline-route',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  templateUrl: './AirlineRouteComp.html',
  styleUrls: ['./AirlineRouteComp.scss'],
  providers: [AirlineRouteApiService]
})
export class AirlineRouteComp implements OnInit {
  airlineRouteFg: FormGroup = this.rxFormBuilder.formGroup(AirlineRouteModel);
  airlineRouteList: AirlineRouteModel[] = [];
  isEditMode = false;
  selectedAirlineRouteId: number | null = null;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private airlineRouteApiService: AirlineRouteApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadAirlineRoutes();
  }

  loadAirlineRoutes(): void {
    this.airlineRouteApiService.getList()
      .pipe(
        tap((data: AirlineRouteModel[]) => {
          this.airlineRouteList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load airline routes');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.airlineRouteFg.value;
    const model = new AirlineRouteModel(formValue);

    if (this.isEditMode && this.selectedAirlineRouteId) {
      model.id = this.selectedAirlineRouteId;
      this.airlineRouteApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Airline route updated successfully');
          this.resetForm();
          this.loadAirlineRoutes();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      this.airlineRouteApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Airline route created successfully');
          this.resetForm();
          this.loadAirlineRoutes();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.airlineRouteFg.value.iata) {
      this.notificationService.error('IATA is required');
      return false;
    }
    return true;
  }

  editAirlineRoute(airlineRoute: AirlineRouteModel): void {
    this.isEditMode = true;
    this.selectedAirlineRouteId = airlineRoute.id;
    this.airlineRouteFg.patchValue(airlineRoute);
  }

  deleteAirlineRoute(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this airline route?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.airlineRouteApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Airline route deleted successfully');
              this.loadAirlineRoutes();
            },
            error: (err) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.airlineRouteFg.reset();
    this.isEditMode = false;
    this.selectedAirlineRouteId = null;
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocationApiService } from '../../../service/api_services/LocationApiService';
import { NotificationService } from '../../../service/NotificationService';
import { LocationModel } from '../../../dto/LocationModel';
import {LocationTypeEnum} from "../../../enum/LocationTypeEnum";
import { tap } from 'rxjs';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './LocationComp.html',
  styleUrls: ['./LocationComp.scss'],
  providers: [LocationApiService]
})
export class LocationComp implements OnInit {
  locationFg: FormGroup = this.rxFormBuilder.formGroup(LocationModel);
  locationList: LocationModel[] = [];
  isEditMode = false;
  selectedLocationId: number | null = null;
  locationTypes = Object.values(LocationTypeEnum);

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private locationApiService: LocationApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationApiService.getList()
      .pipe(
        tap((data: LocationModel[]) => {
          this.locationList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load locations');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.locationFg.value;
    const model = new LocationModel(formValue);

    if (this.isEditMode && this.selectedLocationId) {
      model.id = this.selectedLocationId;
      this.locationApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Location updated successfully');
          this.resetForm();
          this.loadLocations();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      this.locationApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Location created successfully');
          this.resetForm();
          this.loadLocations();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.locationFg.value.name) {
      this.notificationService.error('Name is required');
      return false;
    }
    if (!this.locationFg.value.type) {
      this.notificationService.error('Type is required');
      return false;
    }
    return true;
  }

  editLocation(location: LocationModel): void {
    this.isEditMode = true;
    this.selectedLocationId = location.id;
    this.locationFg.patchValue({
      name: location.name,
      type: location.type,
    });
  }

  deleteLocation(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this location?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.locationApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Location deleted successfully');
              this.loadLocations();
            },
            error: (err) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.locationFg.reset();
    this.isEditMode = false;
    this.selectedLocationId = null;
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}

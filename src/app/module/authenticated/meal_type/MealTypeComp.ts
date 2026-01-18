import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MealTypeApiService } from '../../../service/api_services/MealTypeApiService';
import { NotificationService } from '../../../service/NotificationService';
import { MealTypeModel } from '../../../dto/MealTypeModel';
import { tap } from 'rxjs';

@Component({
  selector: 'app-meal-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  templateUrl: './MealTypeComp.html',
  styleUrls: ['./MealTypeComp.scss'],
  providers: [MealTypeApiService]
})
export class MealTypeComp implements OnInit {
  mealTypeFg: FormGroup = this.rxFormBuilder.formGroup(MealTypeModel);
  mealTypeList: MealTypeModel[] = [];
  isEditMode = false;
  selectedMealTypeId: number | null = null;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private mealTypeApiService: MealTypeApiService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadMealTypes();
  }

  loadMealTypes(): void {
    this.mealTypeApiService.getList()
      .pipe(
        tap((data: MealTypeModel[]) => {
          this.mealTypeList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load meal types');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.mealTypeFg.value;
    const model = new MealTypeModel(formValue);

    if (this.isEditMode && this.selectedMealTypeId) {
      model.id = this.selectedMealTypeId;
      this.mealTypeApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Meal type updated successfully');
          this.resetForm();
          this.loadMealTypes();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      this.mealTypeApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Meal type created successfully');
          this.resetForm();
          this.loadMealTypes();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.mealTypeFg.value.name) {
      this.notificationService.error('Name is required');
      return false;
    }
    return true;
  }

  editMealType(mealType: MealTypeModel): void {
    this.isEditMode = true;
    this.selectedMealTypeId = mealType.id;
    this.mealTypeFg.patchValue({
      name: mealType.name,
      detail: mealType.detail,
    });
  }

  deleteMealType(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this meal type?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.mealTypeApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Meal type deleted successfully');
              this.loadMealTypes();
            },
            error: (err) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.mealTypeFg.reset();
    this.isEditMode = false;
    this.selectedMealTypeId = null;
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}

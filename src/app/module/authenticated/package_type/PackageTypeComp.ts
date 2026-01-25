import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { PackageTypeApiService } from '../../../service/api_services/PackageTypeApiService';
import { NotificationService } from '../../../service/NotificationService';
import { PackageTypeModel } from '../../../dto/PackageTypeModel';
import { PackageTypeUpdateModel } from '../../../dto/PackageTypeUpdateModel';
import { tap } from 'rxjs';
import { AuthService } from '../../../service/AuthService';
import {PackageTypeSearchModel} from '../../../dto/PackageTypeSearchModel';

@Component({
  selector: 'app-package-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  templateUrl: './PackageTypeComp.html',
  styleUrls: ['./PackageComp.scss'],
  providers: [PackageTypeApiService]
})
export class PackageTypeComp implements OnInit {
  packageTypeFg: FormGroup = this.rxFormBuilder.formGroup(PackageTypeUpdateModel);
  packageTypeList: PackageTypeModel[] = [];
  isEditMode = false;
  selectedPackageTypeId: number | null = null;
  companyId: number | null = null;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private packageTypeApiService: PackageTypeApiService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {


    const decodedPayload = this.authService.getJwtPayload();
    const rawCompanyId = decodedPayload?.CompanyId ?? '';
    this.companyId = rawCompanyId !== '' ? Number(rawCompanyId) : null;

    this.loadPackageTypes();
  }

  loadPackageTypes(): void {
    var model = new PackageTypeSearchModel();
    model.companyId = this.companyId;
    this.packageTypeApiService.search(model)
      .pipe(
        tap((data: PackageTypeModel[]) => {
          this.packageTypeList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load package types');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.packageTypeFg.value;
    const model = new PackageTypeUpdateModel(formValue);

    if (this.isEditMode && this.selectedPackageTypeId) {
      model.id = this.selectedPackageTypeId;
      this.packageTypeApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Package type updated successfully');
          this.resetForm();
          this.loadPackageTypes();
        },
        error: (err: any) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      model.companyId = this.companyId;
      this.packageTypeApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Package type created successfully');
          this.resetForm();
          this.loadPackageTypes();
        },
        error: (err: any) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.packageTypeFg.value.name) {
      this.notificationService.error('Name is required');
      return false;
    }
    return true;
  }

  editPackageType(packageType: PackageTypeModel): void {
    this.isEditMode = true;
    this.selectedPackageTypeId = packageType.id;
    this.packageTypeFg.patchValue(packageType);
  }

  deletePackageType(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this package type?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.packageTypeApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Package type deleted successfully');
              this.loadPackageTypes();
            },
            error: (err: any) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.packageTypeFg.reset();
    this.isEditMode = false;
    this.selectedPackageTypeId = null;
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}

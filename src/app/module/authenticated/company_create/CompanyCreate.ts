import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CompanyApiService } from '../../../service/api_services/CompanyApiService';
import { NotificationService } from '../../../service/NotificationService';
import { CompanyModel } from '../../../dto/CompanyModel';
import { tap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  templateUrl: './CompanyCreate.html',
  styleUrls: ['./CompanyCreate.scss'],
  providers: [CompanyApiService]
})
export class CompanyCreate implements OnInit {
  companyFg: FormGroup = this.rxFormBuilder.formGroup(CompanyModel);
  companyList: CompanyModel[] = [];
  isEditMode = false;
  selectedCompanyId: number | null = null;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private companyApiService: CompanyApiService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyApiService.getList()
      .pipe(
        tap((data: CompanyModel[]) => {
          this.companyList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.companyFg.value;
    const model = new CompanyModel(formValue);

    if (this.isEditMode && this.selectedCompanyId) {
      model.id = this.selectedCompanyId;
      this.companyApiService.update(model).subscribe({
        next: () => {
          this.notificationService.success('Company updated successfully');
          this.resetForm();
          this.loadCompanies();
        },
        error: (err) => {
          this.notificationService.error('Failed to update company');
        }
      });
    } else {
      this.companyApiService.create(model).subscribe({
        next: () => {
          this.notificationService.success('Company created successfully');
          this.resetForm();
          this.loadCompanies();
        },
        error: (err) => {
          this.notificationService.error('Failed to create company');
        }
      });
    }
  }

  validate(): boolean {
    if (!this.companyFg.value.companyName) {
      this.notificationService.error('Company name is required');
      return false;
    }
    if (!this.companyFg.value.crNumber) {
      this.notificationService.error('CR number is required');
      return false;
    }
    return true;
  }

  editCompany(company: CompanyModel): void {
    this.isEditMode = true;
    this.selectedCompanyId = company.id;
    this.companyFg.patchValue(company);
  }

  deleteCompany(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this company?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.companyApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Company deleted successfully');
              this.loadCompanies();
            },
            error: (err) => {
              this.notificationService.error('Failed to delete company');
            }
          });
        }
      });
  }

  resetForm(): void {
    this.companyFg.reset();
    this.isEditMode = false;
    this.selectedCompanyId = null;
  }
}

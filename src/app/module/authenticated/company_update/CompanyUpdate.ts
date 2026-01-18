import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CompanyApiService } from '../../../service/api_services/CompanyApiService';
import { NotificationService } from '../../../service/NotificationService';
import { CompanyModel } from '../../../dto/CompanyModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  templateUrl: './CompanyUpdate.html',
  styleUrls: ['./CompanyUpdate.scss'],
  providers: [CompanyApiService]
})
export class CompanyUpdate implements OnInit {
  companyFg: FormGroup = this.rxFormBuilder.formGroup(CompanyModel);
  id: number | null = 1;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private companyApiService: CompanyApiService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.id) {
      this.loadCompany(this.id);
    }

    // this.route.params.subscribe(params => {
    //   this.id = +params['id'];
    //   if (this.id) {
    //     this.loadCompany(this.id);
    //   }
    // });
  }

  loadCompany(id: number): void {
    this.companyApiService.getById(id).subscribe({
      next: (data) => {
        this.companyFg.patchValue(data);
      },
      error: (err) => {
        this.notificationService.error('Failed to load company details');
      }
    });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    const formValue = this.companyFg.value;
    const model = new CompanyModel(formValue);
    model.id = this.id;
    this.companyApiService.update(model).subscribe({
      next: () => {
        this.notificationService.success('Company updated successfully');
      },
      error: (err) => {
        this.notificationService.error(err.error?.message || 'Failed to update company');
      }
    });
  }

  validate(): boolean {
    if (!this.companyFg.value.id) {
      this.notificationService.error('Id is required');
      return false;
    }
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

  resetForm(): void {
    this.companyFg.reset();
    if (this.id) {
      this.loadCompany(this.id);
    }
  }
}

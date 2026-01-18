import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserApiService } from '../../service/api_services/UserApiService';
import { NotificationService } from '../../service/NotificationService';
import { SeasonApiService } from '../../service/api_services/SeasonApiService';
import { CustomerUserCreationModel } from '../../dto/CustomerUserCreationModel';
import { SeasonModel } from '../../dto/SeasonModel';
import { tap } from 'rxjs';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-customer-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule,
    RouterLink
  ],
  templateUrl: './CustomerUserCreationComp.html',
  styleUrls: ['./CustomerUserCreationComp.scss'],
  providers: [UserApiService, SeasonApiService]
})
export class CustomerUserCreationComp implements OnInit {
  customerFg: FormGroup = this.rxFormBuilder.formGroup(CustomerUserCreationModel);
  seasonList: SeasonModel[] = [];
  isSubmitting = false;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private userApiService: UserApiService,
    private notificationService: NotificationService,
    private seasonApiService: SeasonApiService
  ) { }

  ngOnInit(): void {
    this.loadSeasons();
  }

  loadSeasons(): void {
    this.seasonApiService.getList()
      .pipe(
        tap((data: SeasonModel[]) => {
          this.seasonList = data;
        })
      )
      .subscribe({
        error: (err) => {
          this.notificationService.error('Failed to load seasons');
        }
      });
  }

  onSubmit(): void {
    if (!this.validate()) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.customerFg.value;
    const model = new CustomerUserCreationModel(formValue);

    this.userApiService.customerUserCreation(model).subscribe({
      next: () => {
        this.notificationService.success('Customer registered successfully');
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.notificationService.error(err.error.message);
        this.isSubmitting = false;
      }
    });
  }

  validate(): boolean {
    if (!this.customerFg.value.username) {
      this.notificationService.error('Username is required');
      return false;
    }
    if (!this.customerFg.value.password) {
      this.notificationService.error('Password is required');
      return false;
    }
    if (!this.customerFg.value.email) {
      this.notificationService.error('Email is required');
      return false;
    }
    if (!this.customerFg.value.seasonId) {
      this.notificationService.error('Season id is required');
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.customerFg.reset();
  }
}

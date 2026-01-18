import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationService } from '../../service/NotificationService';
import { SeasonApiService } from '../../service/api_services/SeasonApiService';
import { CompanyUserCreationModel } from '../../dto/CompanyUserCreationModel';
import { SeasonModel } from '../../dto/SeasonModel';
import { tap } from 'rxjs';
import {UserApiService} from "../../service/api_services/UserApiService";

@Component({
  selector: 'app-company_create-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './CompanyUserCreationComp.html',
  styleUrls: ['./CompanyUserCreationComp.scss'],
  providers: [UserApiService, SeasonApiService]
})
export class CompanyUserCreationComp implements OnInit {
  companyFg: FormGroup = this.rxFormBuilder.formGroup(CompanyUserCreationModel);
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
    const formValue = this.companyFg.value;
    const model = new CompanyUserCreationModel(formValue);

    this.userApiService.companyUserCreation(model).subscribe({
      next: () => {
        this.notificationService.success('Company registered successfully');
        this.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.notificationService.error('Failed to register company_create');
        this.isSubmitting = false;
      }
    });
  }

  validate(): boolean {
    if (!this.companyFg.value.username) {
      this.notificationService.error('Username is required');
      return false;
    }
    if (!this.companyFg.value.password) {
      this.notificationService.error('Password is required');
      return false;
    }
    if (!this.companyFg.value.email) {
      this.notificationService.error('Email is required');
      return false;
    }
    if (!this.companyFg.value.companyName) {
      this.notificationService.error('Company Name is required');
      return false;
    }
    if (!this.companyFg.value.crNumber) {
      this.notificationService.error('CR Number is required');
      return false;
    }
    if (!this.companyFg.value.seasonId) {
      this.notificationService.error('Season id is required');
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.companyFg.reset();
  }
}

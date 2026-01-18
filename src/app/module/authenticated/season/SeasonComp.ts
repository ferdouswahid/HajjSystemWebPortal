import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxFormBuilder, RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SeasonApiService } from '../../../service/api_services/SeasonApiService';
import { NotificationService } from '../../../service/NotificationService';
import { SeasonModel } from '../../../dto/SeasonModel';
import { tap } from 'rxjs';

@Component({
  selector: 'app-season',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    BsDatepickerModule
  ],
  templateUrl: './SeasonComp.html',
  styleUrls: ['./SeasonComp.scss'],
  providers: [SeasonApiService]
})
export class SeasonComp implements OnInit {
  seasonFg: FormGroup = this.rxFormBuilder.formGroup(SeasonModel);
  seasonList: SeasonModel[] = [];
  isEditMode = false;
  selectedSeasonId: number | null = null;

  constructor(
    private rxFormBuilder: RxFormBuilder,
    private seasonApiService: SeasonApiService,
    private notificationService: NotificationService
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

    const formValue = this.seasonFg.value;
    const dto = new SeasonModel(formValue);

    if (this.isEditMode && this.selectedSeasonId) {
      dto.id = this.selectedSeasonId;
      this.seasonApiService.update(dto).subscribe({
        next: () => {
          this.notificationService.success('Season updated successfully');
          this.resetForm();
          this.loadSeasons();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    } else {
      this.seasonApiService.create(dto).subscribe({
        next: () => {
          this.notificationService.success('Season created successfully');
          this.resetForm();
          this.loadSeasons();
        },
        error: (err) => {
          this.notificationService.error(err.error.message);
        }
      });
    }
  }

  validate(): boolean {
    if (!this.seasonFg.value.title) {
      this.notificationService.error('Title is required');
      return false;
    }
    if (!this.seasonFg.value.startDate) {
      this.notificationService.error('Start date is required');
      return false;
    }
    if (!this.seasonFg.value.endDate) {
      this.notificationService.error('End date is required');
      return false;
    }
    return true;
  }

  editSeason(season: SeasonModel): void {
    this.isEditMode = true;
    this.selectedSeasonId = season.id;
    this.seasonFg.patchValue({
      title: season.title,
      startDate: season.startDate ? new Date(season.startDate) : '',
      endDate: season.endDate ? new Date(season.endDate) : '',
      isCurrent: season.isCurrent
    });
  }

  deleteSeason(id: number | null): void {
    if (!id) return;

    this.notificationService.confirm('Are you sure you want to delete this season?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this.seasonApiService.delete(id).subscribe({
            next: () => {
              this.notificationService.success('Season deleted successfully');
              this.loadSeasons();
            },
            error: (err) => {
              this.notificationService.error(err.error.message);
            }
          });
        }
      });
  }

  resetForm(): void {
    this.seasonFg.reset();
    this.isEditMode = false;
    this.selectedSeasonId = null;
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
}

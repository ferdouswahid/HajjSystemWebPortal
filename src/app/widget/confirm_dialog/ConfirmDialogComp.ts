import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onConfirmClick()" cdkFocusInitial>Confirm</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      padding: 10px;
    }
    mat-dialog-actions {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  `]
})
export class ConfirmDialogComp {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComp>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}

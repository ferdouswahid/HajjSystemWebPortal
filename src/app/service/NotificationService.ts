import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmDialogComp } from "../widget/confirm_dialog/ConfirmDialogComp";

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  success(message: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'app-notification-success'
    });
  }

  error(message: string): void {
    this.snackBar.open(message, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'app-notification-error'
    });
  }

  confirm(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComp, {
      width: '300px',
      data: { message: message },
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

}

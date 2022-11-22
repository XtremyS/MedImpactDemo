import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogBoxComponent } from 'src/app/pages/dailog-boxes/alert-dialog-box/alert-dialog-box.component';
import { FormModalComponent } from 'src/app/pages/dailog-boxes/form-modal/form-modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  //* Alert Dialog Configuration
  DurationInSeconds = 3;
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  //* Alert Snack Bar Function
  OpenAlertDialog(Message: string) {
    this._snackBar.openFromComponent(AlertDialogBoxComponent, {
      duration: this.DurationInSeconds * 1000,
      panelClass: ['Alert_SnackBar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: Message,
    });
  }

  //* Form Open Dialog Box Function
  OpenDialog(): void {
    this.dialog.open(FormModalComponent);
  }
}

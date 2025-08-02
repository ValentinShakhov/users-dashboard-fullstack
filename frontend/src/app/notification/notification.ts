import {MatSnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
  }

  showError(message: string) {
    this.showMessage(message, 'Dismiss');
  }

  showMessage(message: string, action: string = 'Close', duration = 6000) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: ['snackbar'],
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }
}

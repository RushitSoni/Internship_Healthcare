import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsComponent } from './notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private dialog: MatDialog) {}

  displayNotification(message: string, color: string) {
    const dialogRef = this.dialog.open(NotificationsComponent, {
      data: { message, color },
      width: '40%',
      height:'10%',
      position: { top: '50px', right: '50px' },
      panelClass: 'custom-dialog'


    });

    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }
}

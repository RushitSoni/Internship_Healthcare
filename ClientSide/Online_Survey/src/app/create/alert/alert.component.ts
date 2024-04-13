import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  constructor(private dialogRef: MatDialogRef<AlertComponent>) {}

  close() {
    this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateService } from '../create.service';

@Component({
  selector: 'app-templatedetail',
  templateUrl: './templatedetail.component.html',
  styleUrl: './templatedetail.component.css',
})
export class TemplatedetailComponent {
  templateName!: '';
  templateList: string[] = [];
  constructor(
    private dialogRef: MatDialogRef<TemplatedetailComponent>,
    private snackbar: MatSnackBar,
    private service: CreateService
  ) {}

  // checking whether the template already exists or not.

  check(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.service.getTemplate().subscribe((data) => {
        this.templateList = [];
        data.forEach((element) => {
          this.templateList.push(element.surveyName);
        });
        if(this.templateList.includes(this.templateName)) {
          this.snackbar.open('Template Already Exists!', 'Close', {
            duration: 2000,
          });
          reject();
        }
        resolve();
      });
    });
  }

  close() {
    this.check().then((data) => {
      if (this.templateName == null) {
        this.snackbar.open('Name is Mandatory!', 'Close', {
          duration: 2000,
        });
      } else {
        this.dialogRef.close(this.templateName);
      }
    });
  }
}

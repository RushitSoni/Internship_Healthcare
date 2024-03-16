import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-templatedetail',
  templateUrl: './templatedetail.component.html',
  styleUrl: './templatedetail.component.css'
})
export class TemplatedetailComponent {

  templateName! : [''];

  constructor(private dialogRef : MatDialogRef<TemplatedetailComponent>,private snackbar : MatSnackBar)
  {}

  close()
  {
    if(this.templateName == null)
    {
      this.snackbar.open("Name is Mandatory!",'Close',{
        duration : 2000
      });
    }
    else
    {
      this.dialogRef.close(this.templateName);
    }
  }
}

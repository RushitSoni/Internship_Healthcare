import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-templatedetail',
  templateUrl: './templatedetail.component.html',
  styleUrl: './templatedetail.component.css'
})
export class TemplatedetailComponent {

  templateName! : string;

  constructor(private dialogRef : MatDialogRef<TemplatedetailComponent>)
  {}

  close()
  {
    if(this.templateName == null)
    {
      console.log("Please enter your Name");
    }
    this.dialogRef.close(this.templateName);
  }
}

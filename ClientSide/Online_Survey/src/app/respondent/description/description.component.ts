import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {
  surveyId! : number;

  constructor(public dialogRef : MatDialogRef<DescriptionComponent>,private router:Router)
  {

  }

  close()
  {
    this.router.navigate(['respondent/:surveyid', 'fill']);
    this.dialogRef.close();
  }
}

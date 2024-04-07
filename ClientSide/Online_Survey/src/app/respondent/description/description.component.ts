import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { Init } from 'node:v8';
import { RespondentserviceService } from '../respondentservice.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit {
  surveyId : number = this.service.surveyid;
  description! : string;
  constructor(public dialogRef : MatDialogRef<DescriptionComponent>,private router:Router,private service: RespondentserviceService)
  {

  }

  ngOnInit(): void {

    this.service.getDescription(this.surveyId).subscribe((data) => {
      this.description = data.description;
    });
  }

  close()
  {
    this.dialogRef.close();
  }
}

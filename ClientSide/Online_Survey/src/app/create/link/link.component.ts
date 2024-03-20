import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent implements OnInit{
  

  Frontendurl! : string;
  inputUrl : string = '';

  constructor(private globalservice : GlobalserviceService,private dialogRef : MatDialogRef<LinkComponent>,private snackbar : MatSnackBar)
  {

  }

  ngOnInit(): void {
    this.Frontendurl = this.globalservice.FrontendUrl + '/respondent/' + this.globalservice.SurveyId;
    this.inputUrl = this.Frontendurl;
  }

  copied()
  {
    this.snackbar.open("Copied!",'X',{
      duration : 2000
    });
    this.close();
  }

  close()
  {
    this.dialogRef.close();
  }

}

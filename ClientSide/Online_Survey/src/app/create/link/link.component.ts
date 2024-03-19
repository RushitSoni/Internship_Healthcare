import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent implements OnInit{
  

  Frontendurl! : string;
  inputUrl : string = '';

  constructor(private globalservice : GlobalserviceService,private dialogRef : MatDialogRef<LinkComponent>)
  {

  }

  ngOnInit(): void {
    this.Frontendurl = this.globalservice.FrontendUrl + '/respondent/' + this.globalservice.SurveyId;
    this.inputUrl = this.Frontendurl;
  }

  close()
  {
    this.dialogRef.close(this.inputUrl);
  }

}

import { Component, OnInit } from '@angular/core';
import { CreateService } from '../create.service';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SettimeComponent } from '../settime/settime.component';
import { SurveyTable } from '../../shared/Models/Survey';

@Component({
  selector: 'app-generate-survey',
  templateUrl: './generate-survey.component.html',
  styleUrl: './generate-survey.component.css'
})

export class GenerateSurveyComponent implements OnInit{
  settime = true;
  selectedStartDate! : Date;
  selectedEndDate! : Date;
  mindate: String;
  selectedTime: any;
  selectedDuration! : number;
  description : string = '';
  constructor(private dialog : MatDialog,private service: CreateService,private globalService: GlobalserviceService,private router : Router)
  {
    this.mindate = this.formatDate(new Date());
  }

  ngOnInit(): void {
    
  }

  formatDate(date : Date) : String {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettimeComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result); // Data passed back from dialog
      this.CreateSurvey(result);
    });
  }
  
  CreateSurvey(surveyTable : SurveyTable)
  {
    this.service.createSurvey(surveyTable).subscribe((data)=>{
      this.globalService.SurveyId = data;
    });
    this.settime = !this.settime;
    this.router.navigate(['/create/generate','addquestion']);
  }
}
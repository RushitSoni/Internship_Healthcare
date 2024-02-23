import { Component, OnInit } from '@angular/core';
import { CreateService } from '../create.service';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-survey',
  templateUrl: './generate-survey.component.html',
  styleUrl: './generate-survey.component.css'
})
export class GenerateSurveyComponent implements OnInit{

  selectedDate : string = '';
  set = true;
  mindate: String;
selectedTime: any;
  constructor(private service: CreateService,private globalService: GlobalserviceService,private router : Router)
  {
    this.mindate = this.formatDate(new Date());
  }

  ngOnInit(): void {
    
  }

  formatDate(date : Date) : String {
    const year = date.getFullYear();
    // console.log(date.getFullYear());
    const month = date.getMonth() + 1;
    // console.log(date.getMonth());
    const day = date.getDate();
    // console.log(date.getDate());
    // console.log(day.toString());
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  SetTime()
  {
    this.set = !this.set;
  }
  
  CreateSurvey()
  {
    this.service.createSurvey('ccc5dff2-a4c6-4c9c-882a-130bab6a2d26').subscribe((data)=>{
      this.globalService.SurveyId = data;
    });

    this.router.navigate(['/create/generate','addquestion']);
  }

  
}

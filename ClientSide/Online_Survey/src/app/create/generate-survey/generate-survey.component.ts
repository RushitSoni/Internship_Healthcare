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

  constructor(private service: CreateService,private globalService: GlobalserviceService,private router : Router)
  {

  }

  ngOnInit(): void {
    
  }

  CreateSurvey()
  {
    this.service.createSurvey('ccc5dff2-a4c6-4c9c-882a-130bab6a2d26').subscribe((data)=>{
      this.globalService.SurveyId = data;
    });

    this.router.navigate(['/create/generate','addquestion']);
  }
}

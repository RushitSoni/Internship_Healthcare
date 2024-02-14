import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../services/service1.service';
import { GlobalService } from '../globalservice/global.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent implements OnInit {

  constructor(private service: Service1Service,private globalService: GlobalService) {

  }

  ngOnInit(): void {
    
  }
  
  CreateSurvey()
    {
       this.service.createSurvey(this.globalService.SurveyorId).subscribe((data)=>{
         this.globalService.SurveyId = data;
       })
    }
}

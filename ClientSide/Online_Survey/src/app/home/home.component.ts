import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../../globalservice/globalservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userLoggedId : string|undefined
  constructor(private globalService: GlobalserviceService) { }


  ngOnInit(): void {
    this.userLoggedId=this.globalService.SurveyorId
    
  }
  totalSurveys: number = 0;
  totalCompany: number = 0;
  displayedColumns: string[] = ['name', 'status', 'responses', 'view'];

  
  surveys = [
    {
      SurveyName: 'Survey 1',
      status: 'To be launched soon',
      Count: 0,
      id: 1
    },
    {
      SurveyName: 'Survey 2',
      status: 'Open',
      Count: 100,
      id: 2
    },
    {
      SurveyName: 'Survey 3',
      status: 'Closed',
      Count: 75,
      id: 3
    }
  ];

  
}

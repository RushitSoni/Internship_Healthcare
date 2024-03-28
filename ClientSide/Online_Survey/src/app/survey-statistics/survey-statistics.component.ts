import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../workspace/workspace.service';

@Component({
  selector: 'app-survey-statistics',
  templateUrl: './survey-statistics.component.html',
  styleUrl: './survey-statistics.component.css'
})
export class SurveyStatisticsComponent implements OnInit{

  totalSurveys!: number ;
  totalResponses!: number ;
  

  constructor(private workspaceService:WorkspaceService) { }

 ngOnInit(): void {

  setTimeout(() => {
    this.loadData();
  }, 100);
   
 }

//  ngAfterViewInit(): void {
 
//  this.loadData()
// }

loadData(){


  this.workspaceService.getAllSurveys().subscribe((res)=>{
    this.totalSurveys=res.length
  })

  this.workspaceService.getAllResponses().subscribe((res)=>{
    this.totalResponses=res.length
  })
}

}

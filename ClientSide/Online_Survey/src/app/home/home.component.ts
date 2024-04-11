import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { SurveyTable } from '../shared/Models/Survey';
import { Observable, forkJoin, map } from 'rxjs';
import { Company } from '../shared/Models/company';
import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { ResponseVisulizationComponent } from '../workspace/response-visulization/response-visulization.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userLoggedId : string|undefined
  activeSurveys!:SurveyTable[]
  responseCounts: { [key: number]: number } = {}; 
  constructor(private globalService: GlobalserviceService,
    private workspaceService: WorkspaceService,
    private dialog:MatDialog
  ) { }


  ngOnInit(): void {
    this.userLoggedId=this.globalService.SurveyorId
    this.loadActiveSurveys()
    this.loadTotalCompany()

   
    
    
  }
  totalSurveys: number = 0;
  totalCompany: number = 0;
  displayedColumns: string[] = ['name', 'responses','end date','end time', 'action'];




  loadActiveSurveys() {
    this.workspaceService.getAllSurveys().subscribe(
      (response: SurveyTable[]) => {
        const usersSurveys = response.filter(survey => survey.surveyorId === this.userLoggedId);
        this.totalSurveys = usersSurveys.length;
  
        const observables = usersSurveys.map(survey => this.workspaceService.checkDate(survey.surveyId));
       
        forkJoin(observables).subscribe(
          (results: number[]) => {
            this.activeSurveys = usersSurveys.filter((survey, index) => results[index] === 0);
            console.log(this.activeSurveys);
  
            // Fetch response counts for active surveys
            const activeSurveyIds = this.activeSurveys.map(survey => survey.surveyId);
            this.fetchResponseCounts(activeSurveyIds);
          },
          error => {
            console.error("Error during date check:", error);
          }
        );
      },
      error => {
        console.error("Error during active survey fetching:", error);
      }
    );
  }
  

  loadTotalCompany(){
    this.workspaceService.getAllCompanies().subscribe(
      (data: Company[]) => {
        const companies = data.filter((company) => company.adminId === this.userLoggedId);
        this.totalCompany=companies.length
        
      },
      (error) => {
        console.log('Error fetching companies:', error);
      }
    );
  }

  fetchResponseCounts(surveyIds: number[]) {


    surveyIds.forEach((surveyId)=> this.workspaceService.getResponseBySurveyId(surveyId).subscribe((res:any)=>{
      this.responseCounts[surveyId]=res.result.length
    })
    
  );
  console.log(this.responseCounts)
  }
  
  
  getTotalResponses(surveyid: number) {
   
        if (this.responseCounts && this.responseCounts[surveyid] !== undefined) {
          return this.responseCounts[surveyid];
        }
        return 0;
  }
  
  openVisulization(surveyId: number,surveyName:string){
    const dialogRef = this.dialog.open(ResponseVisulizationComponent, {
      width: '95%',
      height:'95%'
      // autoFocus: false // Prevent auto-focusing on first input
    });
  
    dialogRef.componentInstance.surveyId= surveyId;
    dialogRef.componentInstance.surveyName= surveyName;
    // dialogRef.componentInstance.userId = this.globalService.SurveyorId;
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
  
      }
    });
  }

  
}

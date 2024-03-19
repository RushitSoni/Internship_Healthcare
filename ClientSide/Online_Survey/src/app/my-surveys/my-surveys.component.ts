import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkspaceService } from '../workspace/workspace.service';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import { SurveyTable } from '../shared/Models/Survey';
import { MatDialog } from '@angular/material/dialog';
import { ResponseVisulizationComponent } from '../workspace/response-visulization/response-visulization.component';
import { User } from '../shared/Models/user';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrl: './my-surveys.component.css'
})
export class MySurveysComponent implements OnInit {

  surveys : SurveyTable[]=[]
  users: User[] =[];

  displayedColumns: string[] = ['name','creator','date_create','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers()
     this.loadSurveys()
  }

  constructor(
    private workspaceService:WorkspaceService,
    private globalService:GlobalserviceService,
    private dialog:MatDialog
  ){

  }


  applyFilter(event:Event) {
    const filterValue=(event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadSurveys(): void {
    this.workspaceService.getAllSurveys().subscribe(
      (data: SurveyTable[]) => {
       
        console.log("lol",data[0].surveyorId)
    
        this.surveys = data.filter(survey => survey.deptId === null && survey.surveyorId === this.globalService.SurveyorId);
        //this.surveys=data
        console.log("Surveys Fetched !!", this.surveys);
  
  
        this.dataSource = new MatTableDataSource(this.surveys);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('Error fetching surveys:', error);
      }
    );
  }
  loadUsers(): void {
    this.workspaceService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(this.users);
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  getEmailByUserId(userId: string): string | undefined {
    // Assuming 'users' is an array of User objects
    const user = this.users.find(user => user.id === userId);
    return user ? user.email : undefined;
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

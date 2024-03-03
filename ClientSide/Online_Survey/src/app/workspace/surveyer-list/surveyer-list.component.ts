import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Subscription } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { APIResponse } from '../../shared/Models/APIResponse';
import { Company } from '../../shared/Models/company';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';
import { User } from '../../shared/Models/user';
import { WorkspaceService } from '../workspace.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSurveyerComponent } from '../add-edit-surveyer/add-edit-surveyer.component';

@Component({
  selector: 'app-surveyer-list',
  templateUrl: './surveyer-list.component.html',
  styleUrl: './surveyer-list.component.css'
})
export class SurveyerListComponent implements OnInit {

  companyId: string = '';
  departmentId: string = '';

  isAdmin=false

  users: User[] =[];

  surveyerDepts :SurveyerViaDept[]=[]

  surveyerDeptForm: FormGroup=new FormGroup({}); // Remove initialization here
  submitted = false;

  user: any ; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  
  displayedColumns: string[] = ['name','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, 
              private workspaceService: WorkspaceService,
              private formBuilder: FormBuilder,
              private accountService:AccountService,
              private dialog:MatDialog
           ) {} // Inject FormBuilder here

  ngOnInit(): void {

    this.userSubscription = this.accountService.user$.subscribe(
      user => {
        this.user = user; 
        // Assign user data to the local variable
       
      }
    );
    this.route.params.subscribe(params => {
      this.companyId = params['companyId'];
      this.departmentId = params['departmentId'];
      console.log('Company ID:', this.companyId);
      console.log('Department ID:', this.departmentId);
    });
    this.loadSurveyers(this.departmentId);
    this.loadUsers();
   
   
    this.checkAdminRole()
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

  loadSurveyers(departmentId: string): void {
    const departmentIdNumber: number = Number(departmentId);
    console.log(departmentIdNumber)
  
    this.workspaceService.getAllSurveyerDepts().subscribe(
      (data: SurveyerViaDept[]) => {
      
        this.surveyerDepts = data.filter(surveyer => {
          console.log(surveyer.deptId)
          return surveyer.deptId === departmentIdNumber;
        });
        console.log(this.surveyerDepts);

        this.dataSource = new MatTableDataSource(this.surveyerDepts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('Error fetching surveyers:', error);
      }
    );
  }
  
  

 

checkAdminRole(): void {
  // Assuming your user object has a role property indicating the user's role
  const companyIdNumber: number = Number(this.companyId);
  this.workspaceService.getAllCompanies().subscribe(
    (data: Company[]) => {
      // Filter companies based on userId
      const temp=data.filter(company => company.companyId===companyIdNumber && company.adminId === this.user.id);
      console.log("AdminCheck",temp)
      if(temp.length!=0){
       
        this.isAdmin=true
      }
    },
    error => {
      console.log('Error fetching companies:', error);
    }
  );
  
}

openAddEditCompanyForm() {
  const dialogRef = this.dialog.open(AddEditSurveyerComponent);

  dialogRef.componentInstance.companyId = Number(this.companyId);
  dialogRef.componentInstance.departmentId = Number(this.departmentId);
  dialogRef.componentInstance.users = this.users;


  dialogRef.afterClosed().subscribe(result => {
    // Reload companies and update table after dialog is closed
    console.log(result)
    if (result === 'saved') {
      this.dataSource.data=[]
      this.surveyerDepts=[]
      this.loadSurveyers(this.departmentId);
      this.loadUsers();
    }
  });
}


applyFilter(event:Event) {
  const filterValue=(event.target as HTMLInputElement).value
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


deleteSurveyer(survyerID : number) {
  if (confirm('Are you sure you want to delete this surveyer?')) {
    this.workspaceService.deleteSurveyerDept(survyerID).subscribe(
      response => {
        console.log('Surveyer deleted successfully:', response);

        this.dataSource.data=[]
        this.surveyerDepts=[]
        this.loadSurveyers(this.departmentId);
        this.loadUsers();
        
        
      },
      error => {
        console.error('Error deleting surveyer:', error);
      }
    );
  }
}

updateSurveyer(surveyer:SurveyerViaDept){
  

 if (surveyer != undefined){
  const dialogRef = this.dialog.open(AddEditSurveyerComponent, {
    data:surveyer
  });

  dialogRef.componentInstance.companyId = Number(this.companyId);
  dialogRef.componentInstance.departmentId = Number(this.departmentId);
  dialogRef.componentInstance.users = this.users;


  dialogRef.afterClosed().subscribe(result => {
    // Reload companies and update table after dialog is closed
    if (result === 'saved') {
      this.dataSource.data=[]
      this.surveyerDepts=[]
      this.loadSurveyers(this.departmentId);
      this.loadUsers();
      
    }
  });
 }


 

 

}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../shared/Models/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from '../workspace.service';

import { APIResponse } from '../../shared/Models/APIResponse';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';
import { AccountService } from '../../account/account.service';
import { Subscription } from 'rxjs';
import { Company } from '../../shared/Models/company';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditDepartmentComponent } from '../add-edit-department/add-edit-department.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  companyId: string = ''; // Initialize the property inline

  isAdmin=false


  departments :Department[]=[]

 

  user: any ; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  
  displayedColumns: string[] = ['name','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private workspaceService: WorkspaceService, private formBuilder: FormBuilder,private route: ActivatedRoute,private accountService:AccountService) { }

  ngOnInit(): void {


    this.userSubscription = this.accountService.user$.subscribe(
      user => {
        this.user = user; 
      }
    );
    
    this.companyId = this.route.snapshot.paramMap.get('companyId') || ''; // Initialize it here if necessary
    // You can use this.companyId in your component logic
    // console.log(this.companyId)

    this.loadDepartments(this.companyId,this.user.id)
   
    this.checkAdminRole()
  }


  loadDepartments(companyId: string, userId: string): void {
    const companyIdNumber: number = Number(companyId); // Parse the companyId to a number if necessary
  
    // Fetch all SurveyerViaDept entries for the given user and company
    this.workspaceService.getAllSurveyerDepts().subscribe(
      (surveyers: SurveyerViaDept[]) => {
        // Filter department IDs associated with the given user and company
        const departmentIds = surveyers
          .filter(surveyer => surveyer.companyId === companyIdNumber && surveyer.userId === userId)
          .map(surveyer => surveyer.deptId);
  
        // Fetch all departments and filter based on department IDs
        this.workspaceService.getAllDepartments().subscribe(
          (data: Department[]) => {
            this.departments = data.filter(department => departmentIds.includes(department.departmentId));
            console.log(this.departments);


            this.dataSource = new MatTableDataSource(this.departments);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },
          error => {
            console.log('Error fetching departments:', error);
          }
        );
      },
      error => {
        console.log('Error fetching SurveyerViaDept:', error);
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
  const dialogRef = this.dialog.open(AddEditDepartmentComponent);

  dialogRef.componentInstance.companyId = Number(this.companyId);

  
  dialogRef.afterClosed().subscribe(result => {
    // Reload companies and update table after dialog is closed
    console.log(result)
    if (result === 'saved') {
      this.dataSource.data=[]
      this.departments=[]
      this.loadDepartments(this.companyId,this.user.id)
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


deleteDepartment(departmentId: number) {
  if (confirm('Are you sure you want to delete this department?')) {
    this.workspaceService.deleteDepartment(departmentId).subscribe(
      response => {
        console.log('Department deleted successfully:', response);

        this.dataSource.data=[]
        this.departments=[]
        this.loadDepartments(this.companyId,this.user.id)
        
        
      },
      error => {
        console.error('Error deleting department:', error);
      }
    );
  }
}

updateDepartment(dept : Department){
  

 if (dept != undefined){
  const dialogRef = this.dialog.open(AddEditDepartmentComponent, {
    data: dept
  });

  dialogRef.afterClosed().subscribe(result => {
    // Reload companies and update table after dialog is closed
    if (result === 'saved') {
      this.dataSource.data=[]
      this.departments=[]
      this.loadDepartments(this.companyId,this.user.id)
    }
  });
 }


 

 

}
}
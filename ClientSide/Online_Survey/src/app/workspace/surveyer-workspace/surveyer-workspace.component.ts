import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder
import { User } from '../../shared/Models/user';
import { WorkspaceService } from '../workspace.service';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';
import { APIResponse } from '../../shared/Models/APIResponse';
import { Company } from '../../shared/Models/company';
import { Subscription } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyTable } from '../../shared/Models/Survey';

@Component({
  selector: 'app-surveyer-workspace',
  templateUrl: './surveyer-workspace.component.html',
  styleUrls: ['./surveyer-workspace.component.css']
})
export class SurveyerWorkspaceComponent implements OnInit {

  companyId: string = '';
  departmentId: string = '';

  isAdmin=false

  users: User[] =[];

  surveyerDepts :SurveyerViaDept[]=[]
  surveys : SurveyTable[]=[]

  surveyerDeptForm: FormGroup=new FormGroup({}); // Remove initialization here
  submitted = false;

  user: any ; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  displayedColumns: string[] = ['name','creator','date_create','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, 
              private workspaceService: WorkspaceService,
              private formBuilder: FormBuilder,
              private accountService:AccountService
              ,private router: Router) {} // Inject FormBuilder here

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
    this.loadSurveys()
   
    this.initializeForm(); // Call initializeForm method
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
      },
      error => {
        console.log('Error fetching surveyers:', error);
      }
    );
  }
  



  initializeForm() {
    this.surveyerDeptForm = this.formBuilder.group({
      
      deptId: this.departmentId,
      userId: '',
      userName: ['', Validators.required],
      companyId: this.companyId,
    });
  }

  createSurveyerDept(): void {
    this.submitted = true;

    console.log(this.surveyerDeptForm.value.userName)
    console.log(this.users)
    const selectedUser = this.users.find(user => user.email == this.surveyerDeptForm.value.userName);
    
    if (selectedUser) {
        console.log(selectedUser.id)
        this.surveyerDeptForm.patchValue({
            userId: selectedUser.id

        });

    this.workspaceService.createSurveyerDept(this.surveyerDeptForm.value)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 201) {
          console.log('Surveyer created successfully. ID:', response.result);
          this.loadSurveyers(this.departmentId);
        } else {
          console.error('Error creating surveyer:', response.errorMsg);
        }
      });
  } else {
    console.error('User Not Found...!');
    // Handle error, maybe show an error message to the user
}
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
      // Filter surveys based on departmentId
      this.surveys = data.filter(survey => survey.deptId === Number(this.departmentId));
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

getEmailByUserId(userId: string): string | undefined {
  // Assuming 'users' is an array of User objects
  const user = this.users.find(user => user.id === userId);
  return user ? user.email : undefined;
}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../shared/Models/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from '../workspace.service';

import { APIResponse } from '../../shared/Models/APIResponse';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';
import { AccountService } from '../../account/account.service';
import { Subscription } from 'rxjs';
import { Company } from '../../shared/Models/company';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  companyId: string = ''; // Initialize the property inline

  isAdmin=false


  departments :Department[]|undefined

  departmentForm: FormGroup = new FormGroup({});
  submitted = false;

  user: any ; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  constructor(private workspaceService: WorkspaceService, private formBuilder: FormBuilder,private route: ActivatedRoute,private accountService:AccountService) { }

  ngOnInit(): void {


    this.userSubscription = this.accountService.user$.subscribe(
      user => {
        this.user = user; 
        // Assign user data to the local variable
       
      }
    );
    
    this.companyId = this.route.snapshot.paramMap.get('companyId') || ''; // Initialize it here if necessary
    // You can use this.companyId in your component logic
    // console.log(this.companyId)

    this.loadDepartments(this.companyId,this.user.id)
    this.initializeForm()
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
  
  
  
  initializeForm() {
    
    this.departmentForm = this.formBuilder.group({
      name: ['', Validators.required], // Add 'name' control with validators
      companyId:this.companyId,
      
    });
  }

 
createDepartment(): void {


  const companyIdNumber: number = Number(this.companyId);
  this.submitted = true;

  this.workspaceService.createDepartment(this.departmentForm.value)
    .subscribe((response: APIResponse) => {
      if (response.responseCode === 201) {
        console.log('Department created successfully. ID:', response.result);
        // Refresh the list of companies
        this.loadDepartments(this.companyId,this.user.id);
        

        // Create SurveyerViaDept for the department creator
        console.log(response.result)
        const deptIdNumber :number=Number(response.result)
        const departmentCreatorSurveyer: SurveyerViaDept = {
          userId: this.user.id, 
          companyId: companyIdNumber,
          deptId: deptIdNumber,
          userName:this.user.userName
        };
        this.createSurveyerDeptForDepartmentCreator(departmentCreatorSurveyer);
      } else {
        console.error('Error creating department:', response.errorMsg);
        // Handle error, maybe show an error message to the user
      }
    });
}

createSurveyerDeptForDepartmentCreator(surveyer: SurveyerViaDept): void {
  this.workspaceService.createSurveyerDept(surveyer)
    .subscribe((response: APIResponse) => {
      if (response.responseCode === 201) {
        console.log('SurveyerViaDept created successfully. ID:', response.result);
      } else {
        console.error('Error creating SurveyerViaDept:', response.errorMsg);
       
      }
    });
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
}
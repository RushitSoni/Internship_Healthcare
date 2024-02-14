import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../shared/Models/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkspaceService } from '../workspace.service';
import { AccountService } from '../../account/account.service';
import { APIResponse } from '../../shared/Models/APIResponse';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  companyId: string = ''; // Initialize the property inline


  departments :Department[]|undefined

  departmentForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private workspaceService: WorkspaceService, private formBuilder: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.companyId = this.route.snapshot.paramMap.get('companyId') || ''; // Initialize it here if necessary
    // You can use this.companyId in your component logic
    // console.log(this.companyId)

    this.loadDepartments(this.companyId)
    this.initializeForm()
  }


  loadDepartments(companyId: string): void {
    const companyIdNumber: number = Number(companyId); // Parse the companyId to a number if necessary
  
    this.workspaceService.getAllDepartments().subscribe(
      (data: Department[]) => {
        
        this.departments = data.filter(department => {
         
          return department.companyId === companyIdNumber;
         
        });
        console.log(this.departments);
      },
      error => {
        console.log('Error fetching departments:', error);
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


    this.submitted=true

   
    
    this.workspaceService.createDepartment(this.departmentForm.value)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 201) {
          console.log('Department created successfully. ID:', response.result);
          // Refresh the list of companies
          this.loadDepartments(this.companyId);
          
          
        } else {
          console.error('Error creating department:', response.errorMsg);
          // Handle error, maybe show an error message to the user
        }
      });
  }
}

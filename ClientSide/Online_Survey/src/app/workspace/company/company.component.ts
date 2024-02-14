import { Component, OnInit } from '@angular/core';

import { WorkspaceService } from '../workspace.service';
import { AccountService } from '../../account/account.service';

import { Company } from '../../shared/Models/company';
import { APIResponse } from '../../shared/Models/APIResponse';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

 
  companyForm: FormGroup = new FormGroup({});
  submitted = false;
 

  user: any ; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;
  
  companies: Company[] | undefined;


  constructor(private workspaceService: WorkspaceService, private formBuilder: FormBuilder, public accountService: AccountService) { }

  ngOnInit(): void {
   
   
    this.userSubscription = this.accountService.user$.subscribe(
      user => {
        this.user = user; 
        // Assign user data to the local variable
       
      }
    );

    setTimeout(() => {
      this.loadCompanies(this.user.id);
      
    }, 1000); // 2000 milliseconds = 2 seconds
 
    this.initializeForm()
   
  }
  initializeForm() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required], // Add 'name' control with validators
      adminId:this.user.id// Set default value to user.id if user is available
    });
  }


  loadCompanies(userId: string): void {
    this.workspaceService.getAllCompanies().subscribe(
      (data: Company[]) => {
        // Filter companies based on userId
        this.companies = data.filter(company => company.adminId === userId);
        console.log(this.companies);
      },
      error => {
        console.log('Error fetching companies:', error);
      }
    );
  }
  

  createCompany(): void {


    this.submitted=true

   

    this.workspaceService.createCompany(this.companyForm.value)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 201) {
          console.log('Company created successfully. ID:', response.result);
          // Refresh the list of companies
          this.loadCompanies(this.user.id);
          
          
        } else {
          console.error('Error creating company:', response.errorMsg);
          // Handle error, maybe show an error message to the user
        }
      });
  }
}

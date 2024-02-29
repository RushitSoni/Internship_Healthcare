import { Component, OnInit } from '@angular/core';

import { WorkspaceService } from '../workspace.service';
import { AccountService } from '../../account/account.service';

import { Company } from '../../shared/Models/company';
import { APIResponse } from '../../shared/Models/APIResponse';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  updateCompany() {
    // Implement the logic for updating the company here
  }

  deleteCompany() {
    // Implement the logic for deleting the company here
  }

  updateCompanys(companyId: number): void {
    // Implement your update logic here
    console.log(`Update company with ID ${companyId}`);
  }

  deleteCompanys(companyId: number): void {
    // Implement your delete logic here
    console.log(`Delete company with ID ${companyId}`);
  }

  companyForm: FormGroup = new FormGroup({});
  submitted = false;

  user: any; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  companies: Company[] = [];
  compsniesAsSurveyer: Company[] = [];

  constructor(
    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.accountService.user$.subscribe((user) => {
      this.user = user;
      // Assign user data to the local variable
    });

    setTimeout(() => {
      this.loadCompanies(this.user.id);
      this.loadCompaniesAsSurveyer(this.user.id);
    }, 1000); // 2000 milliseconds = 2 seconds

    this.initializeForm();
  }
  initializeForm() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required], // Add 'name' control with validators
      adminId: this.user.id, // Set default value to user.id if user is available
    });
  }

  loadCompanies(userId: string): void {
    this.workspaceService.getAllCompanies().subscribe(
      (data: Company[]) => {
        // Filter companies based on userId
        this.companies = data.filter((company) => company.adminId === userId);
        console.log(this.companies);
      },
      (error) => {
        console.log('Error fetching companies:', error);
      }
    );
  }

  loadCompaniesAsSurveyer(userId: string): void {
    this.workspaceService.getAllCompanies().subscribe(
      (companies: Company[]) => {
        this.workspaceService.getAllSurveyerDepts().subscribe(
          (surveyers: SurveyerViaDept[]) => {
            const userSurveyers = surveyers.filter(
              (surveyer) => surveyer.userId === userId
            );
            const companyIds = userSurveyers.map(
              (surveyer) => surveyer.companyId
            );
            const filteredCompanies = companies.filter((company) => {
              // Filter out companies that are not already in the `companies` array
              return (
                !this.companies.some(
                  (c) => c.companyId === company.companyId
                ) && companyIds.includes(company.companyId)
              );
            });
            this.compsniesAsSurveyer = filteredCompanies;
          },
          (error) => {
            console.error('Error in getAllSurveyerDepts():', error);
          }
        );
      },
      (error) => {
        console.error('Error in getAllCompanies():', error);
      }
    );
  }

  createCompany(): void {
    this.submitted = true;

    this.workspaceService
      .createCompany(this.companyForm.value)
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

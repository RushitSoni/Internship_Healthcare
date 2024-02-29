import { Component, OnInit ,ViewChild} from '@angular/core';

import { WorkspaceService } from '../workspace.service';
import { AccountService } from '../../account/account.service';

import { Company } from '../../shared/Models/company';
import { APIResponse } from '../../shared/Models/APIResponse';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCompanyComponent } from '../add-edit-company/add-edit-company.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  
  companies: Company[] =[];
  compsniesAsSurveyer:Company[]=[]


  //table

  displayedColumns: string[] = ['name','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private workspaceService: WorkspaceService, private formBuilder: FormBuilder, public accountService: AccountService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
   
   
    this.userSubscription = this.accountService.user$.subscribe(
      user => {
        this.user = user; 
        // Assign user data to the local variable
       
      }
    );

    setTimeout(() => {
      this.loadCompanies(this.user.id);
      this.loadCompaniesAsSurveyer(this.user.id)
    }, 100); // 2000 milliseconds = 2 seconds
 
    
    
   
  }



  loadCompanies(userId: string): void {
    this.workspaceService.getAllCompanies().subscribe(
      (data: Company[]) => {
        // Filter companies based on userId
        this.companies = data.filter(company => company.adminId === userId);
        console.log(this.companies);

        this.updateDataSource(this.compsniesAsSurveyer, 'Admin');

      },
      error => {
        console.log('Error fetching companies:', error);
      }
    );
  }


 
  loadCompaniesAsSurveyer(userId: string): void {
    this.workspaceService.getAllCompanies().subscribe((companies: Company[]) => {
      this.workspaceService.getAllSurveyerDepts().subscribe((surveyers: SurveyerViaDept[]) => {
        const userSurveyers = surveyers.filter(surveyer => surveyer.userId === userId);
        const companyIds = userSurveyers.map(surveyer => surveyer.companyId);
        const filteredCompanies = companies.filter(company => {
          // Filter out companies that are not already in the `companies` array
          return !this.companies.some(c => c.companyId === company.companyId) && companyIds.includes(company.companyId);
        });
        this.compsniesAsSurveyer = filteredCompanies;
       

        this.updateDataSource(this.compsniesAsSurveyer, 'Surveyer');


       
      }, error => {
        console.error("Error in getAllSurveyerDepts():", error);
      });
    }, error => {
      console.error("Error in getAllCompanies():", error);
    });
  }
  
  

  

  openAddEditCompanyForm(){
    const dialogRef = this.dialog.open(AddEditCompanyComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Reload companies and update table after dialog is closed
      if (result === 'saved') {
        this.loadCompanies(this.user.id);
        this.loadCompaniesAsSurveyer(this.user.id);
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

  updateDataSource(companies: Company[], type: string): void {
    // Append appropriate suffix to company names based on type
    const updatedCompanies = companies.map(company => {
      const suffix = type === 'Admin' ? ' (Admin)' : ' ';
      return {
        ...company,
        name: company.name + suffix
      };
    });
  
    // If the type is "Admin" and there are no companies provided, 
    // we need to ensure that the suffix is appended to the user's existing companies
    if (type === 'Admin' && companies.length === 0) {
      this.companies.forEach(company => {
        company.name += ' (Admin)';
      });
    }
  
    // Concatenate updated companies with existing companies
    const mergedCompanies = [...this.companies, ...updatedCompanies];
  
    this.dataSource = new MatTableDataSource(mergedCompanies);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  
}

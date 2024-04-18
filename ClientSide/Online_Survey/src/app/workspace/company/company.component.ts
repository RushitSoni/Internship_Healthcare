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
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
 
  companyForm: FormGroup = new FormGroup({});
  submitted = false;

  user: any; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  companies: Company[] = [];
  compsniesAsSurveyer: Company[] = [];

  displayedColumns: string[] = ['name','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private workspaceService: WorkspaceService, private formBuilder: FormBuilder, public accountService: AccountService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.userSubscription = this.accountService.user$.subscribe((user) => {
      this.user = user;
      // Assign user data to the local variable
    });

    setTimeout(() => {
      this.loadCompanies(this.user.id);
      this.loadCompaniesAsSurveyer(this.user.id)
    }, 100); // 2000 milliseconds = 2 seconds
  }

  loadCompanies(userId: string): void {
    this.workspaceService.getAllCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data.filter((company) => company.adminId === userId);
        this.updateDataSource(this.compsniesAsSurveyer, 'Admin');
      },
      (error) => {
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

  openAddEditCompanyForm() {
    const dialogRef = this.dialog.open(AddEditCompanyComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Reload companies and update table after dialog is closed
      if (result === 'saved') {
        this.dataSource.data=[]
        this.companies=[]
        this.compsniesAsSurveyer=[]
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
    const updatedCompanies = companies.map(company => {
      let suffix = '';
      if (type === 'Admin') {
        suffix = ' (Admin)';
      } 
      return {
        ...company,
        name: company.name + suffix
      };
    });

    if (type === 'Admin' && companies.length === 0) {
      this.companies.forEach(company => {
        company.name += ' (Admin)';
      });
    }

    const mergedCompanies = [...this.companies, ...updatedCompanies];

    this.dataSource = new MatTableDataSource(mergedCompanies);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  deleteCompany(companyId: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.workspaceService.deleteCompany(companyId).subscribe(
        response => {
          console.log('Company deleted successfully:', response);

          this.dataSource.data=[]
          this.companies=[]
          this.compsniesAsSurveyer=[]
          this.loadCompanies(this.user.id);
          this.loadCompaniesAsSurveyer(this.user.id);
          
        },
        error => {
          console.error('Error deleting company:', error);
        }
      );
    }
  }

  updateCompany(company:Company){
    const updatedCompany = { ...company, name: company.name.replace(' (Admin)', '') };
  
    const dialogRef = this.dialog.open(AddEditCompanyComponent, {
      data: updatedCompany
    });


    dialogRef.afterClosed().subscribe(result => {
      // Reload companies and update table after dialog is closed
      if (result === 'saved') {
        this.dataSource.data=[]
        this.companies=[]
        this.compsniesAsSurveyer=[]
        this.loadCompanies(this.user.id);
        this.loadCompaniesAsSurveyer(this.user.id);
        
      }
    });

   

  }
}

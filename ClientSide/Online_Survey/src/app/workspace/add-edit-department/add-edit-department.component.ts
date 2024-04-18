import { Component, Inject, OnInit } from '@angular/core';
import { Department } from '../../shared/Models/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../account/account.service';
import { APIResponse } from '../../shared/Models/APIResponse';
import { Company } from '../../shared/Models/company';
import { AddEditCompanyComponent } from '../add-edit-company/add-edit-company.component';
import { WorkspaceService } from '../workspace.service';
import { ActivatedRoute } from '@angular/router';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrl: './add-edit-department.component.css',
})
export class AddEditDepartmentComponent implements OnInit {
  companyId: number = 0; // Initialize the property inline

  departments: Department[] | undefined;

  departmentForm: FormGroup = new FormGroup({});
  submitted = false;

  user: any; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  constructor(
    private dialogRef: MatDialogRef<AddEditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department,

    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    this.userSubscription = this.accountService.user$.subscribe((user) => {
      this.user = user;
    });
    // this.companyId = this.route.snapshot.paramMap.get('companyId') || '';
    // console.log("Hii",this.companyId)

    this.initializeForm();
  }

  initializeForm() {
    if (this.data) {
      this.departmentForm = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        companyId: this.data.companyId,
      });
    } else {
      this.departmentForm = this.formBuilder.group({
        name: ['', Validators.required],
        companyId: this.companyId,
      });
    }
  }

  createDepartment(): void {
    const companyIdNumber: number = Number(this.companyId);
    this.submitted = true;

    if (this.data) {
      //update

      this.workspaceService
        .updateDepartment(this.departmentForm.value, this.data.departmentId)
        .subscribe((response: APIResponse) => {
          if (response.responseCode === 200) {
            console.log(
              'Department Updated successfully. ID:',
              response.result
            );

            this.dialogRef.close('saved');
          } else {
            console.error('Error updating department:', response.errorMsg);
            alert(response.errorMsg)
          }
        });
    } else {
      this.workspaceService
        .createDepartment(this.departmentForm.value)
        .subscribe((response: APIResponse) => {
          if (response.responseCode === 201) {
            console.log(
              'Department created successfully. ID:',
              response.result
            );

            // Create SurveyerViaDept for the department creator
            // console.log(response.result);
            const deptIdNumber: number = Number(response.result);
            const departmentCreatorSurveyer: SurveyerViaDept = {
              surveyerDeptId: 0,
              userId: this.user.id,
              companyId: companyIdNumber,
              deptId: deptIdNumber,
              // userName: this.user.email
            };
            this.createSurveyerDeptForDepartmentCreator(
              departmentCreatorSurveyer
            );

            // Load departments after successful creation
            //this.loadDepartments(this.companyId, this.user.id);

            this.dialogRef.close('saved');
          } else {
            console.error('Error creating department:', response.errorMsg);
            alert(response.errorMsg)
            // Handle error, maybe show an error message to the user
          }
        });
    }
  }

  createSurveyerDeptForDepartmentCreator(surveyer: SurveyerViaDept): void {
    this.workspaceService
      .createSurveyerDept(surveyer)
      .subscribe((response: APIResponse) => {
        console.log(response);
        if (response.responseCode === 201) {
          console.log(
            'SurveyerViaDept created successfully. ID:',
            response.result
          );
          // Call loadDepartments after SurveyerViaDept creation is successful
          // this.loadDepartments(this.companyId, this.user.id);
        } else {
          console.error('Error creating SurveyerViaDept:', response.errorMsg);
          
        }
      });
  }
}

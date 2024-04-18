import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { WorkspaceService } from '../workspace.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { APIResponse } from '../../shared/Models/APIResponse';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from '../../shared/Models/company';

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrl: './add-edit-company.component.css'
})
export class AddEditCompanyComponent implements OnInit{

 


  companyForm: FormGroup = new FormGroup({});
  submitted = false;

  user: any ; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;



  constructor(private dialogRef: MatDialogRef<AddEditCompanyComponent>,
    @Inject (MAT_DIALOG_DATA) public data:Company
    ,private workspaceService: WorkspaceService, private formBuilder: FormBuilder, public accountService: AccountService){}



  ngOnInit(): void {

   console.log(this.data)

    this.userSubscription = this.accountService.user$.subscribe(
      user => {
        this.user = user; 
        // Assign user data to the local variable
       
      }
    );
    this.initializeForm()
    // this.companyForm.patchValue(this.data)
   
  }

  initializeForm() {

    if(this.data){
      this.companyForm = this.formBuilder.group({
        name: [this.data.name, Validators.required], // Add 'name' control with validators
        adminId:this.data.adminId// Set default value to user.id if user is available
      });

    }
    else{
      this.companyForm = this.formBuilder.group({
        name: ['', Validators.required], // Add 'name' control with validators
        adminId:this.user.id// Set default value to user.id if user is available
      });

    }
   
  }


  createCompany(): void {

    this.submitted=true

    console.log(this.companyForm.value)



    if(this.data){


      //update

      this.workspaceService.updateCompany(this.companyForm.value,this.data.companyId)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 200) {
          console.log('Company Updated successfully. Result:', response.result);
          // Refresh the list of companies
          // this.loadCompanies(this.user.id);

           this.dialogRef.close('saved');

          
          
        } else {
          console.error('Error Updating company:', response.errorMsg);
          alert(response.errorMsg)
          // Handle error, maybe show an error message to the user
        }
      });

    }
    else{

      this.workspaceService.createCompany(this.companyForm.value)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 201) {
          console.log('Company created successfully. ID:', response.result);
          // Refresh the list of companies
          // this.loadCompanies(this.user.id);

           this.dialogRef.close('saved');

          
          
        } else {
          console.error('Error creating company:', response.errorMsg);
          alert(response.errorMsg)
          // Handle error, maybe show an error message to the user
        }
      });

    }




   
  }


}

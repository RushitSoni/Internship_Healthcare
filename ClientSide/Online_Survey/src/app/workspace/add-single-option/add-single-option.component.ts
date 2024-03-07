import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../../account/account.service';
import { Company } from '../../shared/Models/company';
import { AddEditCompanyComponent } from '../add-edit-company/add-edit-company.component';
import { WorkspaceService } from '../workspace.service';
import { APIResponse } from '../../shared/Models/APIResponse';

@Component({
  selector: 'app-add-single-option',
  templateUrl: './add-single-option.component.html',
  styleUrl: './add-single-option.component.css'
})
export class AddSingleOptionComponent implements OnInit {


  questionId!:number
  optionForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private dialogRef: MatDialogRef<AddSingleOptionComponent>,
  
    private workspaceService: WorkspaceService, private formBuilder: FormBuilder){}

    
  ngOnInit(): void {

    this.initializeForm()
  
  }

  initializeForm() {

      this.optionForm = this.formBuilder.group({
        optionText: ['', Validators.required], 
        questionId:this.questionId,

      });

   
  }

  createOption(){

    this.submitted=true

    this.workspaceService.createSingleOption(this.optionForm.value)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 201) {
          console.log('Option created successfully. ID:', response);
         
           this.dialogRef.close('saved');

          
          
        } else {
          console.error('Error creating option:', response.errorMsg);
        
        }
      });

  }



}

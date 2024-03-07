import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { APIResponse } from '../../shared/Models/APIResponse';
import { WorkspaceService } from '../workspace.service';
import { QuestionBankOptions } from '../../shared/Models/QuestionBankOptions';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrl: './edit-option.component.css'
})
export class EditOptionComponent implements OnInit {

  optionData!:QuestionBankOptions
  optionForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private dialogRef: MatDialogRef<EditOptionComponent>,
  
    private workspaceService: WorkspaceService, private formBuilder: FormBuilder){}

    
  ngOnInit(): void {

    this.initializeForm()
  
  }

  initializeForm() {

    this.optionForm = this.formBuilder.group({
      optionId:this.optionData.optionId,
      optionText: [this.optionData.optionText, Validators.required], 
      questionId:this.optionData.questionId,

    });

 
}

  

  updateOption(){

    this.submitted=true

    this.workspaceService.updateOption(this.optionForm.value,this.optionData.optionId)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 200) {
          console.log('Option updated successfully. ID:', response);
         
           this.dialogRef.close('saved');

          
          
        } else {
          console.error('Error updating option:', response);
        
        }
      });

  }


}

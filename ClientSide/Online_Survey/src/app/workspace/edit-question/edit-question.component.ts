import { Component, OnInit } from '@angular/core';
import { QuestionBankQuestion } from '../../shared/Models/questionBankquestion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { APIResponse } from '../../shared/Models/APIResponse';

import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent implements OnInit {

  questionData!:QuestionBankQuestion
  questionForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private dialogRef: MatDialogRef<EditQuestionComponent>,
  
    private workspaceService: WorkspaceService, private formBuilder: FormBuilder){}

    
  ngOnInit(): void {

    this.initializeForm()
  
  }

  initializeForm() {

    this.questionForm = this.formBuilder.group({

      questionId:this.questionData.questionId,
      questionText: [this.questionData.questionText, Validators.required], 
      questionOptionType:this.questionData.questionOptionType,
      companyId:this.questionData.companyId,
      userId:this.questionData.userId

     

    });

 
}

  

  updateQuestion(){

    this.submitted=true

    this.workspaceService.updateQuestion(this.questionForm.value,this.questionData.questionId)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 200) {
          console.log('Question updated successfully. ID:', response);
         
           this.dialogRef.close('saved');

          
          
        } else {
          console.error('Error updating question:', response);
        
        }
      });

  }

}

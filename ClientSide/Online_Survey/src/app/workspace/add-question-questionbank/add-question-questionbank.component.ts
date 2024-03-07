import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { WorkspaceService } from '../workspace.service';
import { QuestionBankOptions } from '../../shared/Models/QuestionBankOptions';

@Component({
  selector: 'app-add-question-questionbank',
  templateUrl: './add-question-questionbank.component.html',
  styleUrls: ['./add-question-questionbank.component.css']
})


export class AddQuestionQuestionbankComponent implements OnInit {

  
  companyId:number | undefined
  userId:string | undefined

  questionId:number | undefined


  questionForm!: FormGroup;

  constructor(
    private workspaceService:WorkspaceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddQuestionQuestionbankComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.questionForm = this.fb.group({
      questionText: '',
      questionType: 'mcq',
      options: this.fb.array([])
    });
    this.addOption();
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.group({
      optionText: ''
    }));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  saveQuestion() {
    const questionText = this.questionForm.value.questionText.trim();
    const questionType = this.questionForm.value.questionType;
    const options = this.questionForm.value.options
                      .map((option: { optionText: string }) => option.optionText.trim())
                      .filter((optionText: string) => optionText !== '');
  
    // Check if any field is empty
    if (questionText === '' || (options.length === 0 && questionType!=='text') ) {
      // Alert the user that some fields are empty
      alert('Please fill in all fields.');
      return;
    }

   
  
    // const questionInfo = `Question Text: ${questionText}, Question Type: ${questionType}, Options: ${options.join(', ')}`;
    // console.log(questionInfo);

    this.workspaceService.addQuestion({
      questionId:0,
      questionText: questionText,
      questionOptionType: questionType,
      companyId: Number(this.companyId),
      userId: this.userId
    }).subscribe({
      next: response => {
        console.log('Question added successfully:', response);
        this.questionId=Number(response.result)
       
        
       if(questionType !== 'text'){
        const questionBankOptionsList: QuestionBankOptions[] = options.map((option :string) => {
          return {
             
              optionText: option,
              questionId: this.questionId
          };
      });
    

        this.workspaceService.createOptions(questionBankOptionsList).subscribe({
          next: response => {
            console.log('Options added successfully:', response);
            
          },
          error: error => {
            console.error('Error adding options:', error);
           
          }
        });
       }
       
      },
      error: error => {
        console.error('Error adding question:', error);
       
      }
    });
 

    
    





    this.dialogRef.close('saved');
  }
  
  
}


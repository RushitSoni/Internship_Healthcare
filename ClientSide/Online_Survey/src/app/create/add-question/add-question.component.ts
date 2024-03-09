import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Option_List, Post_OptionList, Post_Question } from '../../shared/Models/Survey';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from '../create.service';


import { DisplayQuestionbankComponent } from '../display-questionbank/display-questionbank.component';



import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit {
  form_question!: FormGroup;
  Question_id!: number;
  questionnumber: number;
  editingMode: boolean = false; 
  editedQuestionIndex: number | null = null;  
  question_list: Post_Question[] = [];
  companyId!:number

  constructor(
    private fb_question: FormBuilder,
    private globalservice: GlobalserviceService,
    private service: CreateService,
    private router: Router,
    private dialog:MatDialog,
    private route:ActivatedRoute,
    private dialogRef : MatDialog
  ) {
    this.questionnumber = 1;
  }

  ngOnInit(): void {


    this.route.queryParams.subscribe((params) => {
      this.companyId=Number(params['companyID'])
    });


    this.form_question = this.fb_question.group({
      question_text: '',
      question_type: [''], // This will hold the selected question type
      dynamicFields: this.fb_question.array([
        this.fb_question.control(''),
        this.fb_question.control(''),
      ]),
    });
  }

  editQuestion(index: number) {
    const editedQuestion = this.question_list[index];
    this.form_question.patchValue({
      question_text: editedQuestion.questionText,
      question_type: editedQuestion.questionOptionType, // Set the question type of the edited question(in your case i think you have provided some other name or static values ??
    });

    this.dynamicFields.clear();
    editedQuestion.options.forEach((option: Option_List) => {
      this.dynamicFields.push(this.fb_question.control(option.optionText));
    });
  
    this.editingMode = true; // Enter editing mode
    this.editedQuestionIndex = index; // Store the index of the edited question
  }

  get dynamicFields() {
    return this.form_question.get('dynamicFields') as FormArray;
  }

  addDynamicField() {
    this.dynamicFields.push(this.fb_question.control(''));
  }

  removeDynamicField(index: number) {
    if (this.dynamicFields.length <= 2) {
      console.log('Cannot Delete TextField!');
    } else {
      this.dynamicFields.removeAt(index);
    }
  }

  UploadQuestion() {
    try {
      const optionList: Post_OptionList[] = [];
      const textvalues = this.dynamicFields.value;
      const questiontext = this.form_question.get('question_text')!.value;
      const questiontype = this.form_question.get('question_type')!.value;

      if (this.editedQuestionIndex !== null) {
        
        if (textvalues.length != 0 && (questiontype == 1 || questiontype == 2)) {
          for (let index in textvalues) {
            if (textvalues[index] != '') {
              const newoption: Post_OptionList = {
                optionId: Number(index),
                surveyId: Number(localStorage.getItem('surveyId')),
                optionText: textvalues[index],
              };
              optionList.push(newoption);
            } else {
              throw 'Options';
            }
          }
        }

        // Update the question data with new values from the form fields
        this.question_list[this.editedQuestionIndex] = {
          questionId: this.editedQuestionIndex + 1,
          surveyId: Number(localStorage.getItem('surveyId')),
          questionText: this.form_question.value.question_text,
          options: optionList,
          questionOptionType: this.form_question.value.question_type // Update the question type
        };
    
        // Reset form fields and editing mode
        this.editingMode = false; // Exit editing mode
        this.editedQuestionIndex = null; // Reset edited question index
      }
      else
      {
        //adding the option to the Post_OptionList[].
        if (textvalues.length != 0 && (questiontype == 1 || questiontype == 2)) {
          for (let index in textvalues) {
            if (textvalues[index] != '') {
              const newoption: Post_OptionList = {
                optionId: Number(index),
                surveyId: Number(localStorage.getItem('surveyId')),
                optionText: textvalues[index],
              };
              optionList.push(newoption);
            } else {
              throw 'Options';
            }
          }
        }

        //Adding all the details to the question_list for preview.
        if (questiontype != '' && questiontext != '') {
          const questionoption: Post_Question = {
            questionId: this.questionnumber,
            surveyId: Number(localStorage.getItem('surveyId')),
            questionText: this.form_question.get('question_text')?.value,
            questionOptionType: this.form_question.get('question_type')?.value,
            options: optionList,
          };

          this.questionnumber = this.questionnumber + 1;

          this.question_list.push(questionoption);
        } else {
          throw 'Questions';
        }
      }
      
    } catch (error) {
      throw error;
    }
  }

  Upload(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.addQuestionOption(this.question_list).subscribe((data) => {
        resolve();
        console.log('Done');
      });
    });
  }

  reset() {
    try {
      this.UploadQuestion();
      this.form_question.reset({
        question_text: '',
        question_type: [''], // This will hold the selected question type
        dynamicFields: this.fb_question.array([
          this.fb_question.control(''),
          this.fb_question.control(''),
        ]),
      });
    } catch (error) {
      const dialog = this.dialogRef.open(AlertComponent , {
        width: '100%',
        height: '20%'
      });
      throw error;
    }
  }

  OnComplete() {
    try {
      this.reset();
      this.Upload()
        .then((result) => {
          this.router.navigate(['create/generate', 'complete'], {
            skipLocationChange: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
    
    }
  }


  /////Question Bank Zone

  openQuestionBank() {
    const dialogRef = this.dialog.open(DisplayQuestionbankComponent, {
      width: '75%',
      height:'90%',
      // autoFocus: false // Prevent auto-focusing on first input
    });
    
    dialogRef.componentInstance.companyId = Number(this.companyId);

    dialogRef.componentInstance.questionDataEmitter.subscribe(result => {
      console.log(result); // Handle emitted data here
    });
   
  
  }

}

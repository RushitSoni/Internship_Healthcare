import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  GetTemplate,
  Option_List,
  Post_OptionList,
  Post_Question,
} from '../../shared/Models/Survey';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from '../create.service';
import { DisplayQuestionbankComponent } from '../display-questionbank/display-questionbank.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  companyId!: number;
  from_template : boolean = false;
  templateId! : number;

  constructor(
    private fb_question: FormBuilder,
    private globalservice: GlobalserviceService,
    private service: CreateService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private dialogRef: MatDialog,
    private snackbar : MatSnackBar
  ) {
    this.questionnumber = 1;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.companyId = Number(params['companyID']);
      this.templateId = params['templateId'];
      this.from_template = Boolean(params['fromTemplate']);
    });

    this.form_question = this.fb_question.group({
      question_text: '',
      question_type: '', // This will hold the selected question type
      dynamicFields: this.fb_question.array([
        this.fb_question.control(''),
        this.fb_question.control(''),
      ]),
    });

    if(this.from_template)
    {
      this.checkTemplate();
    }
    
  }

  checkTemplate()
  {
      const data = this.service.getTemplateData(this.templateId) as Observable<GetTemplate[]>;
      data.subscribe((data) => {
        console.log(data);
        data.forEach(element => {
          console.log(element);
          const optionList: Post_OptionList[] = [];
          var count : number = 1;
          if(element.optionType == 1 || element.optionType ==2 )
          {
            element.options.forEach(options => {
              console.log(options);
              const option : Post_OptionList = {
                optionId : count,
                optionText : options.optionText,
                surveyId : Number(localStorage.getItem('surveyId'))
              }
              optionList.push(option);
              count++;
              
          });
          }
          const question : Post_Question = {
            questionId : this.questionnumber,
            questionText : element.questionText,
            questionOptionType : element.optionType,
            surveyId : Number(localStorage.getItem('surveyId')),
            options : optionList 
          }

          this.questionnumber = this.questionnumber + 1;
          
          this.question_list.push(question);
          console.log(this.question_list);
        });
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
        if (
          textvalues.length != 0 &&
          (questiontype == 1 || questiontype == 2)
        ) {
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
          questionOptionType: this.form_question.value.question_type, // Update the question type
        };

        // Reset form fields and editing mode
        this.editingMode = false; // Exit editing mode
        this.editedQuestionIndex = null; // Reset edited question index
      } else {
        //adding the option to the Post_OptionList[].
        if (
          textvalues.length != 0 &&
          (questiontype == 1 || questiontype == 2)
        ) {
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
      const dialog = this.dialogRef.open(AlertComponent, {
        width: '80%',
        height: '25%',
        position: {
          left: '10%',
        },
        disableClose : true
      });
      throw error;
    }
  }

  OnComplete() {
    try {
      this.reset();
      this.Upload()
        .then((result) => {
          this.snackbar.open("Successfull!",'X',{
            duration : 2000
          });
          this.router.navigate(['create/generate', 'complete'], {
            skipLocationChange: true,
          });
        })
        .catch((err) => {
          this.snackbar.open("Oops Failed to Upload Survey!",'X',{
            duration : 2000
          });
        });
    } catch (error) {}
  }

  openQuestionBank() {
    const dialogRef = this.dialog.open(DisplayQuestionbankComponent, {
      width: '75%',
      height: '90%',
    });

    dialogRef.componentInstance.companyId = Number(this.companyId);

    dialogRef.componentInstance.questionDataEmitter.subscribe((result) => {
      console.log("Add Result:",result); 
      const optionList: Post_OptionList[] = [];
      const questionText = result.question.questionText;
      const  questionType = result.question.questionOptionType === "mcq" ? '1' : result.question.questionOptionType === "text" ? '3' : '2'
      console.log("Question type:", questionType);


      this.dynamicFields.clear();

      if(questionType == "1" || questionType == "2")
      {
        var count : number = 1;
        result.options.forEach((option : any) => {
          console.log(option);
            const newoption: Post_OptionList = {
              optionId: count,
              surveyId: Number(localStorage.getItem('surveyId')),
              optionText: option.optionText,
            };
            count = count + 1;
            optionList.push(newoption);
        });
      }

      const questionoption: Post_Question = {
        questionId: this.questionnumber,
        surveyId: Number(localStorage.getItem('surveyId')),
        questionText: questionText,
        questionOptionType: Number(questionType),
        options: optionList,
      };

      this.questionnumber = this.questionnumber + 1;

      this.question_list.push(questionoption);
      
      console.log(this.question_list);
    });
  }

  onDeleteQuestion(questionIndex: number) {
    // Remove the question from the question list based on its index
    console.log();
    this.question_list.splice(questionIndex, 1);
    // Adjust question numbers
    this.question_list.forEach((question, index) => {
      question.questionId = index + 1;
   });
  }
}

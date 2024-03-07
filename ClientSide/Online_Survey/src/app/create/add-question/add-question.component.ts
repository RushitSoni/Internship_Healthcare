import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Post_OptionList, Post_Question } from '../../shared/Models/Survey';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from '../create.service';
import { MatDialog } from '@angular/material/dialog';
import { DisplayQuestionbankComponent } from '../display-questionbank/display-questionbank.component';



@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit {
  form_question!: FormGroup;
  Question_id!: number;
  i!: number;

 
  companyId!:number

  constructor(
    private fb_question: FormBuilder,
    private globalservice: GlobalserviceService,
    private service: CreateService,
    private router: Router,
    private dialog:MatDialog,
    private route:ActivatedRoute
  ) {}

  question_list: Post_Question[] = [];

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      
      this.companyId=Number(params['companyID'])
      // console.log("add-question",this.companyId)
    });

    ////////
    this.i = 1;
    this.form_question = this.fb_question.group({
      question_text: '',
      question_type: [''], // This will hold the selected question type
      dynamicFields: this.fb_question.array([
        this.fb_question.control(''),
        this.fb_question.control(''),
      ]),
    });
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

  UploadQuestion(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const optionList: Post_OptionList[] = [];

      const textvalues = this.dynamicFields.value;

      if (textvalues.length != 0) {
        if (textvalues.length != 0) {
          for (let index in textvalues) {
            const newoption: Post_OptionList = {
              optionId: Number(index),
              surveyId: this.globalservice.SurveyId,
              optionText: textvalues[index],
            };
            optionList.push(newoption);
          }
        }
      }

      const questionoption: Post_Question = {
        questionId: this.i,
        surveyId: this.globalservice.SurveyId,
        questionText: this.form_question.get('question_text')?.value,
        questionOptionType: this.form_question.get('question_type')?.value,
        options: optionList,
      };

      this.i = this.i + 1;

      this.question_list.push(questionoption);
      console.log(this.question_list);
      resolve();
    });
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
    this.UploadQuestion()
      .then((result) => {
        this.dynamicFields.clear();
        this.form_question.reset({
          question_text: '',
          question_type: [''], // This will hold the selected question type
          dynamicFields: this.fb_question.array([
            this.fb_question.control(''),
            this.fb_question.control(''),
          ]),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  AddQuestion() {
    this.reset();
  }

  OnComplete() {
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

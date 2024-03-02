import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Options, Question } from '../../shared/Models/Survey';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { Router } from '@angular/router';
import { CreateService } from '../create.service';
import { resolve } from 'path';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent  implements OnInit{
  form_question! : FormGroup;
  Question_id! : number;
  questionNumber: number = 1; // Initialize question number to 1
  questionPreviews: any[] = []; // Array to hold all question previews
  
  constructor(private fb_question : FormBuilder,private globalservice : GlobalserviceService,private service : CreateService,private router: Router){
    
  }


  option_list : Options[] = [];

  question : Question = {
    QuestionText : "",
    QuestionOptionType : "",
    SurveyId : 0
  };

  ngOnInit(): void {
    this.form_question = this.fb_question.group({
      question_text : "",
      question_type : [''], // This will hold the selected question type
      dynamicFields: this.fb_question.array([this.fb_question.control(''),this.fb_question.control('')])
    });
  }

  get dynamicFields() {
    return this.form_question.get('dynamicFields') as FormArray;
  }

  addDynamicField() {
    this.dynamicFields.push(this.fb_question.control(''));
  }

  removeDynamicField(index: number) {
    if(this.dynamicFields.length <= 2)
    {
      console.log("Cannot Delete TextField!");
    }
    else
    {
      this.dynamicFields.removeAt(index);
    }
    
  }

  UploadQuestion() : Promise<number>
  {
    return new Promise<number>((resolve, reject) => {
      this.question.QuestionText = this.form_question.get('question_text')?.value;
      this.question.QuestionOptionType = this.form_question.get('question_type')?.value;
      this.question.SurveyId = this.globalservice.SurveyId;
  
      this.service.addQuestion(this.question).subscribe((data) => {
        this.Question_id = data;
        resolve(this.Question_id); // Resolve the Promise with Question_id
      }, (error) => {
        reject(error); // Reject the Promise if an error occurs
      });
    });
  }
  
  UploadOptions ()
  {
    // Hello
    return new Promise<void>((resolve, reject) => {
      this.UploadQuestion().then((questionId) => {
        const textvalues = this.dynamicFields.value;
        if(textvalues.length!=0)
        {
          // console.log(textvalues);
          for (let index in textvalues) {
            // console.log(textvalues[index]);
            // console.log('hi');
            // Create a new Options object for each iteration
            const option: Options = {  
              OptionText: textvalues[index],
              QuestionId: questionId, // Use the resolved QuestionId
              SurveyId: this.globalservice.SurveyId
            };
            this.option_list.push(option);
          }

        // console.log(this.option_list);
        
        this.service.addOptions(this.option_list).subscribe((data)=>{
          console.log(data);
          
        });
        }
        resolve();
      }).catch((error) => {
        console.error("Error uploading question:", error);
      });
     });
  }

  reset()
  {
    this.UploadOptions().then((result) => {
      this.option_list = [];
      this.dynamicFields.clear();
      this.form_question.reset({
        question_text : "",
        question_type : [''], // This will hold the selected question type
        dynamicFields: this.fb_question.array([this.fb_question.control(''),this.fb_question.control('')])
    });
    }).catch((err) => {
      
    });
     
  }

  AddQuestion()
  { 
    this.reset();
  }

  OnComplete()
  {
    this.reset();
    this.router.navigate(['create/generate','complete'],{skipLocationChange: true});
  }
}
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Options, Question } from '../../shared/Models/Survey';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { Router } from '@angular/router';
import { CreateService } from '../create.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent  implements OnInit{
  form_question! : FormGroup;
  Question_id! : number;
  
  constructor(private fb_question : FormBuilder,private globalservice : GlobalserviceService,private service : CreateService,private router: Router){
    
  }
   
  option : Options = 
    {
      OptionText : '',
      QuestionId : 0,
      SurveyId : 0
    };

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
      dynamicFields: this.fb_question.array([])
    });
  }

  get dynamicFields() {
    return this.form_question.get('dynamicFields') as FormArray;
  }

  addDynamicField() {
    this.dynamicFields.push(this.fb_question.control(''));
  }

  removeDynamicField(index: number) {
    this.dynamicFields.removeAt(index);
  }

  UploadQuestion()
  {
    this.service.addQuestion(this.question).subscribe((data) => {
    if(data != 0)
    {
      this.Question_id = data;
    }
  })
  }
  
  UploadOptions()
  {
    const textvalues = this.dynamicFields.value;
    console.log(textvalues);
    for(let index in textvalues)
    {
      console.log(textvalues[index]);
      this.option.OptionText = textvalues[index];
      this.option.QuestionId = this.Question_id;
      this.option.SurveyId = this.globalservice.SurveyId;

      this.option_list.push(this.option);
    }

    this.service.addOptions(this.option_list).subscribe((data) => {
        console.log(data);
    });
  }

  AddQuestion()
  {
    this.router.navigate([this.router.url]);
    this.question.QuestionText = this.form_question.get('question_text')?.value;
    this.question.QuestionOptionType = this.form_question.get('question_type')?.value;
    this.question.SurveyId = this.globalservice.SurveyId; 
    this.UploadQuestion();
    this.UploadOptions();
    // this.router.navigate(['/generate','addquestion'], { skipLocationChange: true });
  }

  OnComplete()
  {
    
  }
}

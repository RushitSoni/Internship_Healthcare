import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.css'
})
export class AddQuestionsComponent implements OnInit {
  
  form_question! : FormGroup;
  
  constructor(private fb_question : FormBuilder){
  }

  ngOnInit(): void {
    this.form_question = this.fb_question.group({
      question_text : "",
      question_type : ""
    });

    this.form_question.valueChanges.subscribe(value =>{
      console.log(value.question_type);
    });
  }

  
}

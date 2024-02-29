import { Component } from '@angular/core';
import { Answer, QuestionOption } from '../../shared/Models/Survey';
import { RespondentserviceService } from '../respondentservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrl: './fill.component.css'
})
/**
 * Represents the FillComponent class.
 * This component is responsible for filling out the survey form.
 */
export class FillComponent {
  answer : {[key : string] : string | string[]} = {};
  answerOption! : string;
  answerChoice! : string;
  fillData : QuestionOption[] = []; 
  filledanswer : Answer[] = [];
  constructor(private service: RespondentserviceService) { }

  /**
   * Initializes the component.
   * Adds dummy data to the fillData array for testing purposes.
   */
  ngOnInit() {
    this.fillData = []
    const data = this.service.getData() as Observable<QuestionOption[]>;

    if(data !== undefined)
    {
      data.subscribe((filldata) => {
        this.fillData = filldata;
        console.log(filldata);
      });
    }
  }

  OnSubmit()
  {
    console.log("Question and Answers");
    // this.fillData.forEach(questions => {

      
    //   // console.log(fillAns);
    //   // this.filledanswer.push(fillAns);    
    //   this.answer = {};
    //   this.answerChoice = '';
    //   this.answerOption = '';
    // });

    console.log(this.answer);

    for(let id in this.answer)
    {
      const fillanswer : Answer = {
        Id : this.service.primaryid,
        QuestionId : Number(id),
        OptionId : Number(this.answer[id]),
        AnswerText : String(this.answer[id])
      }

      this.filledanswer.push(fillanswer);
    }

    console.log(this.filledanswer);
    
    this.service.addAnswer(this.filledanswer).subscribe((data) => {
      console.log(data);
    });
  }
}
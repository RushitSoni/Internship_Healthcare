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
  fillData : QuestionOption[] = []; 
  filledanswer : Answer[] = [];
  selectedOptions: { [questionId: number]: number[] } = {}; 

  constructor(private service: RespondentserviceService) { }

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
    for(let id in this.answer)
    {
      const fillanswer : Answer = {
        Id : this.service.primaryid,
        QuestionId : Number(id),
        OptionId : this.selectedOptions[Number(id)],
        AnswerText : String(this.answer[id])
      }

      this.filledanswer.push(fillanswer);
    }

    console.log(this.filledanswer);
    
    this.service.addAnswer(this.filledanswer).subscribe((data) => {
      console.log(data);
    });
  }

  ConvertNumber(list : string | string[] | any)
  {
    const list2 : Number[] = [];
    for(let item in list)
    {
      list2.push(Number(item))
    }

    return list2;
  }
}
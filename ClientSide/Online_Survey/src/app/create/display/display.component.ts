import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CreateService } from '../create.service';
import { Post_Question, QuestionOption } from '../../shared/Models/Survey';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})

export class DisplayComponent implements OnInit, OnChanges{
  
  @Input() question!: Post_Question;
  @Input() questionNumber!: number;

  constructor(private service : CreateService){

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  questions : QuestionOption[] = [];
  
  ngOnInit(): void {
    const data = this.service.getData() as Observable<QuestionOption[]>;

    if(data !== undefined)
    {
      data.subscribe((responsedata) => {
        this.service.setQuestionOption(responsedata);
        this.questions = responsedata;
      });
    }
  }
}
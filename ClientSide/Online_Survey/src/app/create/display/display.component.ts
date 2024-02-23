import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CreateService } from '../create.service';
import { QuestionOption } from '../../shared/Models/Survey';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnChanges{
  

  constructor(private service : CreateService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    const data = this.service.getData() as Observable<QuestionOption[]>;

    if(data !== undefined)
    {
      data.subscribe((responsedata) => {
        
        this.questions = responsedata;
        console.log(this.questions);
      });
    }
  }

  questions : QuestionOption[] = [];
  
  ngOnInit(): void {
    const data = this.service.getData() as Observable<QuestionOption[]>;

    if(data !== undefined)
    {
      data.subscribe((responsedata) => {
        
        this.questions = responsedata;
        console.log(this.questions);
      });
    }
  }

}

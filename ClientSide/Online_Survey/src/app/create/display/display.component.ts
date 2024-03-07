import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CreateService } from '../create.service';
import { Post_Question, QuestionOption } from '../../shared/Models/Survey';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})

export class DisplayComponent implements OnInit{
  
  @Input() question!: Post_Question;
  @Input() questionNumber!: number;
  @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service : CreateService){

  }

  ngOnInit(): void {
  }

  onEdit() {
    this.editClicked.emit();
  }
}
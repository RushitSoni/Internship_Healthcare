import { Component, OnInit } from '@angular/core';
import { Template } from '../../shared/Models/Respondent';

@Component({
  selector: 'app-template-display',
  templateUrl: './template-display.component.html',
  styleUrl: './template-display.component.css'
})
export class TemplateDisplayComponent implements OnInit {
  template_data : Template[] = []
  surveyid : number;

  constructor()
  {
    this.surveyid = Number(localStorage.getItem('surveyId'));
  }
  ngOnInit(): void {
    
  }
}

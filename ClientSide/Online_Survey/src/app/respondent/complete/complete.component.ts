import { Component, OnDestroy, OnInit } from '@angular/core';
import { RespondentNavigateService } from '../respondent-navigate.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.css'
})
export class CompleteComponent implements OnInit , OnDestroy{
  constructor(private navigateService : RespondentNavigateService){}
  
  ngOnDestroy(): void {
    this.navigateService.setFillRoute('');
  }
  
  ngOnInit(): void {
    this.navigateService.setFillRoute('completesurvey');  
  }

}

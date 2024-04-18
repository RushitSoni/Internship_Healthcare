import { Component, OnInit } from '@angular/core';
import { RespondentNavigateService } from '../respondent-navigate.service';

@Component({
  selector: 'app-already-filled',
  templateUrl: './already-filled.component.html',
  styleUrl: './already-filled.component.css'
})
export class AlreadyFilledComponent implements OnInit{
  constructor(private navigateService : RespondentNavigateService){}
  
  ngOnInit(): void {
    this.navigateService.setFillRoute('completesurvey'); 
  }

}

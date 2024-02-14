import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private surveyorId! : number;
  private surveyId! : number;
  constructor() { }

  
  // setting and getting the surveyor id.

  set SurveyorId(value: number)
  {
    this.surveyorId = value;
  }

  get SurveyorId() : number
  {
    return this.surveyorId;
  }

  // setting and getting the survey id.
  set SurveyId(value: number)
  {
    this.surveyId = value;
  }

  get SurveyId() : number
  {
    return this.surveyId;
  }
}

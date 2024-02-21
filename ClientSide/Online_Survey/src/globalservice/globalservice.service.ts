import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {

  private surveyorId : string='428161fa-697c-40bd-bedb-0668f89d938d';
  private surveyId! : number;
  constructor() { }

  
  // setting and getting the surveyor id.
  // set SurveyorId(value: string)
  // {
  //   this.surveyorId = value;
  // }

  get SurveyorId() : string
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

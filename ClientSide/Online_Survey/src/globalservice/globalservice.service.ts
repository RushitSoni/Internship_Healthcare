import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService  {

  private surveyorId! : string;
  private surveyId! : number;
  private frontendUrl! : string;
  constructor() { }

  
  // setting and getting the surveyor id.
  set SurveyorId(value: string)
  {
    this.surveyorId = value;
  }

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

  set FrontendUrl(value: string)
  {
    this.frontendUrl = value;
  }

  get FrontendUrl()
  {
    return this.frontendUrl;
  }
}

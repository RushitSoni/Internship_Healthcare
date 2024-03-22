import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService  {

  // private surveyorId : string='428161fa-697c-40bd-bedb-0668f89d938d';
  private surveyorId: string | undefined;
  private surveyId! : number;
  private frontendUrl! : string;
  private logged=false

  constructor() { }

  
 // setting and getting the surveyor id.
 set SurveyorId(value: string | undefined) {
  this.surveyorId = value;
  // Storing in localStorage
  if (value !== undefined) {
    localStorage.setItem('surveyorId', JSON.stringify(value));
  }
}

get SurveyorId(): string | undefined {
  const storedValue = localStorage.getItem('surveyorId');
  return storedValue ? JSON.parse(storedValue) : undefined;
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


  set Logged(value: boolean) {
    this.logged = value;
    localStorage.setItem('logged', JSON.stringify(this.logged));
  
  }

  get Logged() {
    const storedValue = localStorage.getItem('logged');
    return storedValue ? JSON.parse(storedValue) : undefined;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Options, Question, SurveyTable } from '../shared/Models/Survey';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  surveyorId : SurveyTable = {
    SurveyorId : ""
  }
  constructor(private http : HttpClient) { }

  createSurvey(surveyorid : String)
  {
    console.log(`${environment.appUrl}/Home/GetAdmin`);
    this.surveyorId.SurveyorId = surveyorid;
    return this.http.post<number>(`${environment.appUrl}/Home/CreateSurvey`,this.surveyorId);
  }

  addQuestion(question : Question)
  {
    return this.http.post<number>(`${environment.appUrl}/Home/AddQuestion`,question);
  }

  addOptions(option_list: Options[])
  {
    return this.http.post(`${environment.appUrl}/Home/AddOptions`,option_list);
  }

  generateLink()
  {
    
  }
}

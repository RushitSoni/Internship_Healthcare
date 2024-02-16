import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Options, Question } from '../shared/Models/Survey';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http : HttpClient) { }

  createSurvey(surveyorid : String)
  {
    console.log(`${environment.appUrl}/Home/GetAdmin`);
    console.log(surveyorid);
    return this.http.post<number>(`${environment.appUrl}/Home/CreateSurvey`,surveyorid);
  }

  addQuestion(question : Question)
  {
    return this.http.post<number>('/Home/AddQuestion',question);
  }

  addOptions(option_list: Options[])
  {
    return this.http.post('/Home/AddOptions',option_list);
  }
}

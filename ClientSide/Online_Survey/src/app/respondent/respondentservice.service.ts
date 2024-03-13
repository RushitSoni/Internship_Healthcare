import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Answer, QuestionOption, Respondent, Respondent_Record } from '../shared/Models/Survey';

@Injectable({
  providedIn: 'root'
})
export class RespondentserviceService {

  surveyid! : number;
  respondentid! : number;
  primaryid! : number;

  constructor(private http: HttpClient) { }

  addRespondent(respondent : Respondent)
  {
    return this.http.post<number>(`${environment.appUrl}/Respondent/AddRespondent`,respondent);
  }

  addRecord(record : Respondent_Record)
  {
    return this.http.post<number>(`${environment.appUrl}/Respondent/AddRecord`,record);
  }

  checkDate(surveyId : number)
  {
    var params = new HttpParams().set('surveyId',surveyId);
    return this.http.get<number>(`${environment.appUrl}/Respondent/CheckDate`,{params});
  }

  getData()
  {
    if(this.surveyid !== undefined)
    {
      var params = new HttpParams().set('surveyid',this.surveyid);
      const data = this.http.get<QuestionOption[]>(`${environment.appUrl}/Home/GetQuestionOption`,{params});
      console.log(data);
      return data;
    }

    const quest : QuestionOption[] = []
    return quest;
  }

  addAnswer(answers : Answer[])
  {
    console.log(answers);
    return this.http.post(`${environment.appUrl}/Respondent/AddAnswers`,answers);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import {
  GetTemplate,
  Options,
  Post_Question,
  Question,
  QuestionOption,
  Survey,
  SurveyTable,
  template_detail,
} from '../shared/Models/Survey';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import { Observable } from 'rxjs';
import { Template } from '../shared/Models/Respondent';

@Injectable({
  providedIn: 'root',
})
export class CreateService {
  private questionOption!: template_detail;

  constructor(
    private http: HttpClient,
    private globalservice: GlobalserviceService
  ) {}

  setQuestionOption(data: template_detail) {
    return (this.questionOption = data);
  }

  getQuestionOption() {
    return this.questionOption;
  }

  addQuestionOption(question: Post_Question[]) {
    return this.http.post(
      `${environment.appUrl}/Home/QuestionOption`,
      question
    );
  }

  createSurvey(surveytable: SurveyTable) {
    // console.log(surveytable)
    return this.http.post<number>(
      `${environment.appUrl}/Home/CreateSurvey`,
      surveytable
    );
  }

  addQuestion(question: Question) {
    return this.http.post<number>(
      `${environment.appUrl}/Home/AddQuestion`,
      question
    );
  }

  addOptions(option_list: Options[]) {
    return this.http.post(`${environment.appUrl}/Home/AddOptions`, option_list);
  }

  addTemplate() {
    return this.http.post(
      `${environment.appUrl}/Home/CreateTemplate`,
      this.getQuestionOption()
    );
  }

  getTemplate() {
    var id = String(this.globalservice.SurveyorId);
    var params = new HttpParams().set('id', id);
    const template_data = this.http.get<Template[]>(
      `${environment.appUrl}/Template/GetTemplate`,
      { params }
    );
    return template_data;
  }

  getTemplateData(templateId: number) {
    var params = new HttpParams().set('templateId', templateId);
    const template_data = this.http.get<GetTemplate[]>(
      `${environment.appUrl}/Template/TemplateData`,
      { params }
    );
    console.log(template_data);
    return template_data;
  }

  getData() {
    if (this.globalservice.SurveyId !== undefined) {
      var params = new HttpParams().set(
        'surveyid',
        this.globalservice.SurveyId
      );
      const data = this.http.get<QuestionOption[]>(
        `${environment.appUrl}/Home/GetQuestionOption`,
        { params }
      );
      return data;
    }

    const quest: QuestionOption[] = [];
    return quest;
  }

  sendEmailList(
    recipients: string[],
    subject: string,
    body: string
  ): Observable<any> {
    const request = {
      recipients: recipients,
      subject: subject,
      body: body,
    };
    return this.http.post<any>(`${environment.appUrl}/api/email/send`, request);
  }

  getSurvey() {
    var params = new HttpParams().set(
      'surveyorId',
      String(localStorage.getItem('surveyorId'))
    );
    return this.http.get(`${environment.appUrl}/Respondent/Survey`, { params });
  }

  deleteTemplate(templateId: number) {
    var params = new HttpParams().set(
      'templateId',
      String(localStorage.getItem('templateId'))
    );
    return this.http.delete<any>(
      `${environment.appUrl}/Template/DeleteTemplate/${templateId}`
    );
  }
}

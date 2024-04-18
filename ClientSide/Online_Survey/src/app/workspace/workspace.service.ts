import { Injectable } from '@angular/core';
import { Company } from '../shared/Models/company';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIResponse } from '../shared/Models/APIResponse';
import { Department } from '../shared/Models/department';
import { User } from '../shared/Models/user';
import { SurveyerViaDept } from '../shared/Models/surveyerViaDept';
import { QuestionBankQuestion } from '../shared/Models/questionBankquestion';
import { QuestionBankOptions } from '../shared/Models/QuestionBankOptions';
import { SurveyTable } from '../shared/Models/Survey';
import { ResponseViaSurveyId } from '../shared/Models/ResponseViaSurveyId';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http:HttpClient) { }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.appUrl}/api/company/get`);
  }


  createCompany(company: Company): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.appUrl}/api/company/create`, company);
  }

  updateCompany(company: Company, id: number): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${environment.appUrl}/api/company/update/${id}`, company);
  }

  deleteCompany(id: number): Observable<APIResponse> {
    var params = new HttpParams().set('surveyorId',String(localStorage.getItem('surveyorId')));
    return this.http.delete<APIResponse>(`${environment.appUrl}/api/company/remove/${id}`,{params});
  }

  //department

  

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.appUrl}/api/department/get`);
  }

  createDepartment(department:Department): Observable<APIResponse> {
    var params = new HttpParams().set('surveyorId',String(localStorage.getItem('surveyorId')));
    return this.http.post<APIResponse>(`${environment.appUrl}/api/department/create`, department , {params});
  }

  updateDepartment(department: Department, id: number): Observable<APIResponse> {
    var params = new HttpParams().set('surveyorId',String(localStorage.getItem('surveyorId')));
    return this.http.put<APIResponse>(`${environment.appUrl}/api/department/update/${id}`, department,{params});
  }

  deleteDepartment(id: number): Observable<APIResponse> {
    var params = new HttpParams().set('surveyorId',String(localStorage.getItem('surveyorId')));
    console.log("ID",id)
    return this.http.delete<APIResponse>(`${environment.appUrl}/api/department/remove/${id}`,{params});
  }

  ////

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.appUrl}/api/account/users`);
  }

  /////

  getAllSurveyerDepts(): Observable<SurveyerViaDept[]> {
    return this.http.get<SurveyerViaDept[]>(`${environment.appUrl}/api/Surveyer_Dept/get`);
  }

  createSurveyerDept(surveyer:SurveyerViaDept): Observable<APIResponse> {

    return this.http.post<APIResponse>(`${environment.appUrl}/api/surveyer_dept/create`, surveyer);
  }

  updateSurveyerDept(surveyer:SurveyerViaDept, id: number): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${environment.appUrl}/api/surveyer_dept/update/${id}`, surveyer);
  }

  deleteSurveyerDept(id: number): Observable<APIResponse> { 
    var params = new HttpParams().set('surveyorId',String(localStorage.getItem('surveyorId')));
    // console.log("heyyyy",id)
    return this.http.delete<APIResponse>(`${environment.appUrl}/api/surveyer_dept/remove/${id}`,{params});
  }


  ///questionBank


  addQuestion(question: QuestionBankQuestion): Observable<APIResponse> {

    // console.log(question)
    return this.http.post<APIResponse>(`${environment.appUrl}/api/QuestionBank/CreateQuestion`, question);
  }

  createOptions(options: QuestionBankOptions[]): Observable<APIResponse> {
    console.log(options)
    return this.http.post<APIResponse>(`${environment.appUrl}/api/QuestionBank/CreateOptions`, options);
  }

  getAllQuestions(): Observable<QuestionBankQuestion[]> {
    return this.http.get<QuestionBankQuestion[]>(`${environment.appUrl}/api/QuestionBank/GetQuestion`)
     
  }

  getAllOptions(): Observable<QuestionBankOptions[]> {
    return this.http.get<QuestionBankOptions[]>(`${environment.appUrl}/api/QuestionBank/GetOption`)
      
  }

  deleteQuestion(id: number): Observable<APIResponse> {
    //console.log(id)
    return this.http.delete<APIResponse>(`${environment.appUrl}/api/QuestionBank/RemoveQuestion/${id}`)
  }

  deleteOption(optionId: number): Observable<APIResponse> {
    console.log(optionId)
    return this.http.delete<APIResponse>(`${environment.appUrl}/api/QuestionBank/RemoveOption/${optionId}`);
  }
  
  createSingleOption(option: QuestionBankQuestion): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.appUrl}/api/QuestionBank/CreateSingleOption`, option)
    
  }

  updateOption(option: QuestionBankOptions,id: number): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${environment.appUrl}/api/QuestionBank/UpdateOption/${id}`, option)
    
  }

  updateQuestion(question:QuestionBankQuestion,id: number): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${environment.appUrl}/api/QuestionBank/UpdateQuestion/${id}`, question)
    
  }

  //surveys


  getAllSurveys(): Observable<SurveyTable[]> {

    return this.http.get<SurveyTable[]>(`${environment.appUrl}/Home/GetAllSurveys`);
  }

  //responses

  getAllResponses(): Observable<any> {

    return this.http.get<any>(`${environment.appUrl}/Home/GetAllResponses`);
  }


  getResponseBySurveyId(surveyId: number): Observable<ResponseViaSurveyId> {
    console.log(surveyId)
      return this.http.get<ResponseViaSurveyId>(`${environment.appUrl}/Respondent/GetSurveyResponseBySurveyId/${surveyId}`);
  }
  checkDate(surveyId: number): Observable<number> {
    return this.http.get<number>(`${environment.appUrl}/Respondent/CheckDate?surveyId=${surveyId}`);
  }


}

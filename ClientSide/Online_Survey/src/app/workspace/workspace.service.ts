import { Injectable } from '@angular/core';
import { Company } from '../shared/Models/company';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../shared/Models/APIResponse';
import { Department } from '../shared/Models/department';
import { User } from '../shared/Models/user';
import { SurveyerViaDept } from '../shared/Models/surveyerViaDept';

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

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.appUrl}/api/department/get`);
  }

  createDepartment(department:Department): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.appUrl}/api/department/create`, department);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.appUrl}/api/account/users`);
  }


  getAllSurveyerDepts(): Observable<SurveyerViaDept[]> {
    return this.http.get<SurveyerViaDept[]>(`${environment.appUrl}/api/Surveyer_Dept/get`);
  }

  createSurveyerDept(surveyer:SurveyerViaDept): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${environment.appUrl}/api/surveyer_dept/create`, surveyer);
  }





}

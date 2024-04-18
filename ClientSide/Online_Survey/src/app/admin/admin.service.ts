import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  generateUserReport(): Observable<Blob> {
    return this.http.get(`${environment.appUrl}/api/report/generate/user`, {
      responseType: 'blob'
    });
  }
  generateWorkspaceReport(): Observable<Blob> {
    return this.http.get(`${environment.appUrl}/api/report/generate/workspace`, {
      responseType: 'blob'
    });
  }
  generateSurveyReport(): Observable<Blob> {
    return this.http.get(`${environment.appUrl}/api/report/generate/survey`, {
      responseType: 'blob'
    });
  }
  generateRespondentReport(): Observable<Blob> {
    return this.http.get(`${environment.appUrl}/api/report/generate/respondent`, {
      responseType: 'blob'
    });
  }

  generateActivityReport(): Observable<Blob> {
    return this.http.get(`${environment.appUrl}/api/report/generate/activity`, {
      responseType: 'blob'
    });
  }
}

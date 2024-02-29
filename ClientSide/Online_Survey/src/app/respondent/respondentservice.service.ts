import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Respondent } from '../shared/Models/Survey';

@Injectable({
  providedIn: 'root'
})
export class RespondentserviceService {

  constructor(private http: HttpClient) { }

  addRespondent(respondent : Respondent)
  {
    return this.http.post(`${environment.appUrl}/Home/AddRespondent`,respondent);
  }
}

import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { APP_SERVICE } from '../AppConfig/appconfig.service';
import { Admin, SurveyTable } from '../Interface/Admin';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor(@Inject(APP_SERVICE) private config: AppConfig, private http:HttpClient) { 
    
  }

  getAdmin()
  {
    return this.http.get<Admin[]>('/Home/GetAdmin');
  }

  addSurveyor(surveyor: SurveyTable)
  {
    return this.http.post<number>('/Home/AddSurveyor',surveyor);
  }

  createSurvey(surveyorid : number)
  {
    console.log(surveyorid);
    return this.http.post<number>('/Home/CreateSurvey',surveyorid);
  }
}

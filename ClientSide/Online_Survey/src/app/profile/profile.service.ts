import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/Models/user';
import { Observable } from 'rxjs';
import { APIResponse } from '../shared/Models/APIResponse';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  updateUser(userId: string, model: User): Observable<User> {
    console.log("UserID",userId)
    return this.http.put<User>(`${environment.appUrl}/api/account/update-user/${userId}`, model);
  }
}

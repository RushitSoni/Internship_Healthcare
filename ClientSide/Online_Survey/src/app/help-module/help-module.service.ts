import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpModuleService {

 

  constructor(private http: HttpClient) { }

  viewFile(filename :string): Observable<Blob> {
    return this.http.get((`${environment.appUrl}/api/help/download/${filename}`),{ responseType: 'blob' })
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Add any additional headers if needed
    const headers = new HttpHeaders();
    // headers.append('Authorization', 'Bearer ' + authToken);

    const uploadReq = new HttpRequest('POST', `${environment.appUrl}/api/help/upload`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(uploadReq);
  }


 
  


}

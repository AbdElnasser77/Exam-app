import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {

  private readonly http = inject(HttpClient);

  getDiplomas(token:string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.get(`https://exam-app.elevate-bootcamp.cloud/api/diplomas`,{headers});
  }


}

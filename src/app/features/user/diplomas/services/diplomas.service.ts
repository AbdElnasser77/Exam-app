import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {

  private readonly http = inject(HttpClient);

  getDiplomas(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.get(`https://exam-app.elevate-bootcamp.cloud/api/diplomas`, { headers });
  }

  getDiplomaById(token: string, diplomaId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    const params = new HttpParams().set('id',diplomaId)

    return this.http.get(`https://exam-app.elevate-bootcamp.cloud/api/diplomas/${diplomaId}`, { headers });
    
  }


}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private baseURL = environment.BaseURL;
  private readonly http = inject(HttpClient);

  getAllExams(token: string, diploma_ID: string): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    const params = new HttpParams().set('diplomaId',diploma_ID);

    return this.http.get(`${this.baseURL}/api/exams/`, { params ,headers});

  }
}

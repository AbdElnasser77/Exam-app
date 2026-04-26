import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

  private baseURL = environment.BaseURL;

  private http = inject(HttpClient)

  getExamQuestions(examID:string,token:string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization:`Bearer ${token}`,
    })


    return this.http.get(`${this.baseURL}/api/questions/exam/${examID}`,{headers});

  }
}

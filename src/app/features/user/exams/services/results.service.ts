import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  
    private baseURL = environment.BaseURL;
  
    private http = inject(HttpClient);
  
    getResults(id:string,token:string): Observable<any>{
      const headers = new HttpHeaders({
        Authorization:`Bearer ${token}`,
      })
  
      return this.http.get(`${this.baseURL}/api/results/exam/${id}`,{headers});
  
    }
}

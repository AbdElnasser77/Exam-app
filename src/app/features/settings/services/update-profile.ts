import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfile {
  private http = inject(HttpClient);
  private readonly BaseURL = environment.BaseURL;

  updateProfile(token:string,data:any) :Observable<any>{
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`
    })
    return this.http.patch(`${this.BaseURL}/api/users/profile`,data,{headers})
  }

  deleteAccount(token:string) :Observable<any>{
      const headers = new HttpHeaders({
      authorization: `Bearer ${token}`
    })
    return this.http.delete(`${this.BaseURL}/api/users/account`,{headers})
  }

  requestEmailChange(token: string, newEmail: string): Observable<any> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.post(`${this.BaseURL}/api/users/email/request`, { newEmail }, { headers });
  }

  confirmEmailChange(token: string, code: string): Observable<any> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.post(`${this.BaseURL}/api/users/email/confirm`, { code }, { headers });
  }
}

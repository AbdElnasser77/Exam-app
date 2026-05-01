import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfile {
  private http = inject(HttpClient);
  private readonly BaseURL = environment.BaseURL;

  updateProfile(token:string,data:any){
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`
    })
    return this.http.patch(`${this.BaseURL}/api/users/profile`,data,{headers})
  }
}

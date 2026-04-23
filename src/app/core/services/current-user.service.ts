import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly httpClient = inject(HttpClient)

  getLoggedUser(token:string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get(`https://exam-app.elevate-bootcamp.cloud/api/users/profile`,{headers});
  }

}

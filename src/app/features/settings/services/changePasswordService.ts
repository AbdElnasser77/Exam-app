import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChangePasswordData } from '../models/profile-data';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  BaseURL = environment.BaseURL;

  private readonly http = inject(HttpClient);
  


  changePassword(token: string, data: ChangePasswordData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.post(`${this.BaseURL}/api/users/change-password`, data, { headers });
  }

}

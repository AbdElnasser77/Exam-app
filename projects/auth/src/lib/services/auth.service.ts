import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  LoginRequest,
  RegisterRequest,
  SendEmailVerificationRequest,
  ConfirmEmailVerificationRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../models/auth-requests';
import {
  LoginResponse,
  RegisterResponse,
  SendEmailVerificationResponse,
  ConfirmEmailVerificationResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from '../models/auth-responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BASE_URL = 'https://exam-app.elevate-bootcamp.cloud/api/auth';
  private readonly http = inject(HttpClient);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, data);
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.BASE_URL}/register`, data);
  }

  sendEmailVerification(data: SendEmailVerificationRequest): Observable<SendEmailVerificationResponse> {
    return this.http.post<SendEmailVerificationResponse>(`${this.BASE_URL}/send-email-verification`, data);
  }

  confirmEmailVerification(data: ConfirmEmailVerificationRequest): Observable<ConfirmEmailVerificationResponse> {
    return this.http.post<ConfirmEmailVerificationResponse>(`${this.BASE_URL}/confirm-email-verification`, data);
  }

  forgotPassword(data: ForgotPasswordRequest,): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.BASE_URL}/forgot-password`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${this.BASE_URL}/reset-password`, data);
  }
}

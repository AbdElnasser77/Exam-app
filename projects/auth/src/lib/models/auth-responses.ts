
export interface ApiResponse<T = void> {
  status: boolean;
  message: string;
  payload?: T;
}

export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

export interface LoginPayload {
  token: string;
  user: AuthUser;
}

export type LoginResponse = ApiResponse<LoginPayload>;
export type RegisterResponse = ApiResponse;
export type SendEmailVerificationResponse = ApiResponse;
export type ConfirmEmailVerificationResponse = ApiResponse;
export type ForgotPasswordResponse = ApiResponse;
export type ResetPasswordResponse = ApiResponse;

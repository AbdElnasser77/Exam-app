
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
}

export interface SendEmailVerificationRequest {
  email: string;
}

export interface ConfirmEmailVerificationRequest {
  email: string;
  code: string;
}

export interface ForgotPasswordRequest {
  email: string;
  redirectUrl: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

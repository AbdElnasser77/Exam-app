import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Button } from '../../../../shared/components/ui/button/button';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';
import { ValidationError } from "../../components/validation-error/validation-error";
import { Verify } from "../../components/verify-otp/verify";
import { AuthService } from 'auth';
import {
  NgxIntlTelInputModule,
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-register',
  imports: [Button, PasswordModule, InputTextModule, ReactiveFormsModule, LucideAngularModule, ValidationError, ButtonModule, StepperModule, Verify, RouterLink, NgxIntlTelInputModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  readonly chevronR = ChevronRight;
  readonly SearchCountryField = SearchCountryField;
  readonly CountryISO = CountryISO;
  readonly PhoneNumberFormat = PhoneNumberFormat;

  step: number = 1;
  registerForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  get emailControl() { return this.registerForm.get('email'); }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [undefined, [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  stepBack() {
    this.step--;
    setTimeout(() => {
      this.emailInput.nativeElement.focus();
      this.emailInput.nativeElement.value = '';
    }, 0);
  }

  nextStep() {
    this.step++;
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('rePassword')?.value ? null : { missmatch: true };
  }

  emailStepValidation() {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.invalid) {
      emailControl.markAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.sendEmailVerification({ email: emailControl!.value }).subscribe({
      next: () => {
        this.isLoading = false;
        this.step++;
      },
      error: (e) => {
        this.isLoading = false;
        if (e.status === 409) {
          emailControl!.setErrors({ alreadyRegistered: true });
        }
        this.errorMessage = e.error?.message || 'Failed to send verification email. Please try again.';
      },
    });
  }

  onOtpVerified(code: string) {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.confirmEmailVerification({
      email: this.registerForm.get('email')!.value,
      code,
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.step++;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage = e.error?.message || 'Invalid or expired code. Please try again.';
      },
    });
  }

  usernameStepValidation() {
    const fields = ['firstName', 'lastName', 'userName', 'phone'];
    let isValid = true;
    fields.forEach(field => {
      if (this.registerForm.get(field)?.errors) {
        this.registerForm.get(field)?.markAsTouched();
        isValid = false;
      }
    });
    if (isValid) this.step++;
  }

  Signup() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    this.errorMessage = '';
    this.isLoading = true;

    const { phone: phoneObj, userName, rePassword, ...formValues } = this.registerForm.value;
    const phone = phoneObj?.e164Number ?? '';

    this.authService.register({ ...formValues, username: userName, confirmPassword: rePassword, phone }).subscribe({
      next: () => {
        this.router.navigate(['/diploma']);
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage = e.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}

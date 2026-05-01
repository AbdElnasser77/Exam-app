import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CircleX, LucideAngularModule } from 'lucide-angular';
import { ValidationError } from "../../components/validation-error/validation-error";
import { Button } from "../../../../shared/components/ui/button/button";
import { PasswordModule } from "primeng/password";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'auth';


@Component({
  imports: [LucideAngularModule, ReactiveFormsModule, ValidationError, Button, PasswordModule, RouterLink],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss',
})
export class PasswordReset {
  readonly circleX = CircleX;
  resetForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  private token: string = '';

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  get newPasswordControl() { return this.resetForm.get('newPassword'); }
  get confirmPasswordControl() { return this.resetForm.get('confirmPassword'); }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] ?? '';
    });

    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  resetPassword() {
    this.resetForm.markAllAsTouched();
    if (this.resetForm.invalid) return;

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.resetPassword({
      token: this.token,
      newPassword: this.resetForm.get('newPassword')!.value,
      confirmPassword: this.resetForm.get('confirmPassword')!.value,
    }).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage = e.error?.message || 'Something went wrong. Please try again.';
      },
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (!newPassword || !confirmPassword) return null;
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, missmatch: true });
    } else if (confirmPassword.hasError('missmatch')) {
      const errors = { ...confirmPassword.errors };
      delete errors['missmatch'];
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }
    return null;
  }
}

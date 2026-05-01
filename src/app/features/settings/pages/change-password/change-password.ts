import { Component, inject } from '@angular/core';
import { Password } from "primeng/password";
import { Toast } from "primeng/toast";
import { ValidationError } from "../../../auth/components/validation-error/validation-error";
import { Button } from "../../../../shared/components/ui/button/button";
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChangePasswordService } from '../../services/changePasswordService';
import { MessageService } from 'primeng/api';
import { CircleX, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-change-password',
  imports: [Password, Toast, Button, FormsModule, ReactiveFormsModule, ValidationError, LucideAngularModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
  providers: [MessageService],
})
export class ChangePassword {
  changePasswordForm!: FormGroup;
  errorMessage: string = '';
  readonly circleX = CircleX;

  private readonly changePasswordService = inject(ChangePasswordService);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator })
  }

  changePassword() {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this.errorMessage = '';
      const token = localStorage.getItem('token');
      if (token) {
        this.changePasswordService.changePassword(token, this.changePasswordForm.value).subscribe({
          next: () => {
            this.changePasswordForm.reset();
            this.showToaster("Your password has been changed successfully.");
          },
          error: (e) => {
            this.errorMessage = e.error?.message || 'Something went wrong. Please try again.';
          }
        });
      }
    }
  }

  showToaster(message: string) {
    this.messageService.add({
      summary: message,
      key: 'br',
      life: 3000
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

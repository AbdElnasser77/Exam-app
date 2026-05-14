import { Component, inject } from '@angular/core';
import { Button } from "../../../../shared/components/ui/button/button";
import { LucideAngularModule, MoveLeft, MoveRight } from 'lucide-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationError } from "../../components/validation-error/validation-error";
import { AuthService } from 'auth';

@Component({
  selector: 'app-forgot-password',
  imports: [Button, LucideAngularModule, RouterLink, ReactiveFormsModule, ValidationError],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  readonly moveRight = MoveRight;
  emailForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  submitted: boolean = false;
  submittedEmail: string = '';
  readonly moveLeft = MoveLeft;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  get emailControl() { return this.emailForm.controls['email']; }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  sendEmail() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.invalid) return;

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.forgotPassword({ email: this.emailForm.get('email')!.value,redirectUrl:`${window.location.origin}/auth/reset-password` }).subscribe({
      next: () => {
        this.isLoading = false;
        this.submittedEmail = this.emailForm.get('email')!.value;
        this.submitted = true;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage = e.error?.message || 'Something went wrong. Please try again.';
      },
    });
  }
}

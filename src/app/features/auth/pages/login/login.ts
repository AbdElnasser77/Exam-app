import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/ui/button/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CircleX, LucideAngularModule } from 'lucide-angular';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ValidationError } from "../../components/validation-error/validation-error";
import { AuthService } from 'auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Button, ReactiveFormsModule, LucideAngularModule, InputText, Password, InputMaskModule, ValidationError],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly circleX = CircleX;
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.payload!.token);
        this.router.navigate(['/diplomas']);
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage = e.error?.message || 'Invalid credentials. Please try again.';
      },
    });
  }
}

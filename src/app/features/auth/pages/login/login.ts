import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/components/ui/button/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CircleX, LucideAngularModule, X } from 'lucide-angular';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { ValidationError } from "../../components/validation-error/validation-error";

@Component({
  selector: 'app-login',
  imports: [RouterLink, Button, ReactiveFormsModule, LucideAngularModule, InputText, Password, InputMaskModule, ValidationError],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  readonly circleX = CircleX;
  loginForm!: FormGroup;
  invalid: boolean = false;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
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
    if (this.loginForm.valid) console.log('valid', this.loginForm);
    else {
      console.log('invalid', this.loginForm);
      this.invalid = true;
      this.loginForm.markAllAsTouched();

        console.log(this.loginForm.controls)
    }
  }
}

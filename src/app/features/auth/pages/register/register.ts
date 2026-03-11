import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/ui/button/button';
import { Router, RouterLink } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChevronsUpDown, LucideAngularModule } from 'lucide-angular';
import { ValidationError } from "../../components/validation-error/validation-error";

@Component({
  selector: 'app-register',
  imports: [Button, RouterLink, InputMaskModule, SelectModule, PasswordModule, InputTextModule, ReactiveFormsModule, LucideAngularModule, ValidationError],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  selectedCountry: any;
  value!: string;
  registerForm!: FormGroup;
  readonly selectIcon = ChevronsUpDown;
  countries = [
    { code: 'EG', name: 'Egypt', dialCode: '+20' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971' },
    { code: 'US', name: 'USA', dialCode: '+1' },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20),]],
      lastName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(20),]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['EG', Validators.required],
      phone: [undefined, [Validators.required, Validators.pattern(/^[0-9]{6,15}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.registerForm.get('country')?.valueChanges.subscribe(code => {
      this.selectedCountry = this.countries.find(c => c.code === code);
    });

    this.selectedCountry = this.countries.find(c => c.code === this.registerForm.get('country')?.value);
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value == control.get('rePassword')?.value ? null : { missmatch: true }
  }
  Signup() {
    if (this.registerForm.valid) {
      console.log('success', this.registerForm);
      this.router.navigate(['/verify'],{
        queryParams:{email:this.registerForm.get('email')?.value}
      });
    }else{
      console.log('error', this.registerForm);
      this.registerForm.markAllAsTouched();
    }
  }
}

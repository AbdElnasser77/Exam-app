import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { Button } from '../../../../shared/components/ui/button/button';
import { Router, RouterLink } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
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
import { ChevronRight, ChevronsUpDown, Diamond, LucideAngularModule, RectangleCircle, Square } from 'lucide-angular';
import { ValidationError } from "../../components/validation-error/validation-error";
import { Verify } from "../../components/verify-otp/verify";

@Component({
  selector: 'app-register',
  imports: [Button, InputMaskModule, SelectModule, PasswordModule, InputTextModule, ReactiveFormsModule, LucideAngularModule, ValidationError, ButtonModule, StepperModule, Verify, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  readonly diamond = Diamond;
  readonly square = Square;
  readonly chevronR = ChevronRight;
  readonly selectIcon = ChevronsUpDown;

  step: number = 1;
  selectedCountry: any;
  value!: string;
  registerForm!: FormGroup;

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
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),]],
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

  setStep(value: number) {
    this.step = value;
  }

  stepBack() {
    this.step--;
    setTimeout(() => {
      this.emailInput.nativeElement.focus();
      this.emailInput.nativeElement.value = "";
    }, 0);
  }

  nextStep() {
    this.step++;
  }
  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value == control.get('rePassword')?.value ? null : { missmatch: true }
  }

  emailStepValidation() {
    if (this.registerForm.get('email')?.invalid) {
      this.registerForm.get('email')?.markAsTouched();
    } else {
      this.step++;
    }
  }

  usernameStepValidation() {
    const inputs: string[] = ['firstName', 'lastName', 'userName', 'phone'];
    const form = this.registerForm;
    let isValid: boolean = true;
    inputs.forEach(input => {
      if(form.get(input)?.errors){
        form.get(input)?.markAsTouched();
        isValid = false;
      }
    });
    if (isValid) {
      this.step++;
    }
  }

  Signup() {
    if (this.registerForm.valid) {
      console.log('valid', this.registerForm);
    } else {
      console.log('error', this.registerForm);
      this.registerForm.markAllAsTouched();
    }
  }


}

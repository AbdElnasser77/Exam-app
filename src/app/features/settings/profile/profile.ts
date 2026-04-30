import { Component, inject } from '@angular/core';
import { ValidationError } from "../../auth/components/validation-error/validation-error";
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-profile',
  imports: [ValidationError, InputMaskModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  profileSettings!: FormGroup;
  phone: string = '';


  private fb = inject(FormBuilder);
  ngOnInit() {
    this.profileSettings = this.fb.group({
      firstName: ['', { disabled: true }],
      lastName: ['', { disabled: true }],
      phone: ['', { disabled: true }],
    })
  }




}

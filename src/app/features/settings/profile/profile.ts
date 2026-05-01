import { Component, ElementRef, inject, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { ValidationError } from '../../auth/components/validation-error/validation-error';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import {
  NgxIntlTelInputModule,
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { Button } from "../../../shared/components/ui/button/button";
import { Pencil, LucideAngularModule, PencilLine, TriangleAlert } from 'lucide-angular';
import { Modal, ModalType } from "../../../shared/components/ui/modal/modal";
import { CurrentUserService } from '../../../core/services/current-user.service';
import { isPlatformBrowser } from '@angular/common';
import { UserProfile } from '../../../core/models/user-profile';

@Component({
  selector: 'app-profile',
  imports: [
    ValidationError,
    InputMaskModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    Button,
    LucideAngularModule,
    Modal
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  profileSettings!: FormGroup;

  readonly SearchCountryField = SearchCountryField;
  readonly CountryISO = CountryISO;
  readonly PhoneNumberFormat = PhoneNumberFormat;
  readonly Pencil = PencilLine

  private fb = inject(FormBuilder);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly platformID = inject(PLATFORM_ID);

  token: string = '';
  userData?: UserProfile;

  content: { icon: any; header: string; body: string } = {
    icon: TriangleAlert,
    header: 'Are you sure you want to delete your account?',
    body: 'This action is permanent and cannot be undone.'
  };

  ngOnInit() {
    this.profileSettings = this.fb.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      userName: ['',{disabled: true}],
      email: [''],
    });

    if (isPlatformBrowser(this.platformID)) {
      this.token = localStorage.getItem('token') || '';
      this.currentUserService.getLoggedUser(this.token).subscribe({
        next: (res) => {
          this.userData = res.payload.user;
          console.log(this.userData);
          this.profileSettings.patchValue({
            firstName: this.userData?.firstName,
            lastName: this.userData?.lastName,
            phone: this.userData?.phone,
            userName: this.userData?.username,
            email: this.userData?.email,
          });
        }
      });
    }
  }



  modalState = {
    visible: false,
    // visible:true,
    type: null as ModalType | null,
    // type:'OTP' as ModalType | null,
  }

  openModal(type: ModalType) {
    this.modalState = {
      visible: true,
      type
    }

  }

  closeModal() {
    this.modalState = {
      visible: false,
      type: null
    }
  }

  onConfirm() {
    if (this.modalState.type == 'OTP') {
      console.log('OTP confirmed');
    } else if (this.modalState.type == 'Delete') {
      console.log('Delete confirmed');
    }

  }

}
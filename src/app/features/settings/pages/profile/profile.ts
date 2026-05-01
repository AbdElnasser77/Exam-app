import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ValidationError } from '../../../auth/components/validation-error/validation-error';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import {
  NgxIntlTelInputModule,
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { Button } from "../../../../shared/components/ui/button/button";
import { LucideAngularModule, PencilLine, TriangleAlert } from 'lucide-angular';
import { Modal, ModalType } from "../../../../shared/components/ui/modal/modal";
import { CurrentUserService } from "../../../../core/services/current-user.service";
import { isPlatformBrowser } from '@angular/common';
import { UserProfile } from "../../../../core/models/user-profile";
import { UpdateProfile } from '../../services/update-profile';
import { ProfileData } from '../../models/profile-data';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

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
    Modal,
    Toast
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
  private readonly updateProfile = inject(UpdateProfile);
  private readonly messageService = inject(MessageService);

  token: string = '';
  userData?: UserProfile;
  data: ProfileData = {};
  errorMessage: string = '';
  errors: string[] = [];

  content: { icon: any; header: string; body: string } = {
    icon: TriangleAlert,
    header: 'Are you sure you want to delete your account?',
    body: 'This action is permanent and cannot be undone.'
  };

  ngOnInit() {
    this.profileSettings = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),]],
      phone: ['', [Validators.required]],
      userName: ['', { disabled: true }],
      email: [''],
    });

    if (isPlatformBrowser(this.platformID)) {
      this.token = localStorage.getItem('token') || '';
      this.currentUserService.getLoggedUser(this.token).subscribe({
        next: (res) => {
          this.userData = res.payload.user;
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

  saveChanges() {
    if (this.profileSettings.invalid) {
      this.profileSettings.markAllAsTouched();
      return;
    }
  
    this.errorMessage = '';
    this.errors = [];
    this.data = {
      firstName: this.profileSettings.get('firstName')?.value,
      lastName: this.profileSettings.get('lastName')?.value,
      phone: this.profileSettings.get('phone')?.value.nationalNumber.replace(/\s/g, '')
    }
    this.updateProfile.updateProfile(this.token, this.data).subscribe({
      next: () => {
        this.showToaster();
      },
      error: (e) => {
        if (e.error?.errors) {
          this.errors = e.error.errors.message;
        } else {
          this.errorMessage = e.error?.message || 'Something went wrong. Please try again.';
        }
      }
    });
  }


  modalState = {
    visible: false,
    type: null as ModalType | null,
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

  showToaster() {
    this.messageService.add({
      summary: 'Profile has been updated successfully',
      key: 'br',
      life: 3000
    });
  }


}
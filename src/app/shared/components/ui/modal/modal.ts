import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ChevronRight, LucideAngularModule, X } from "lucide-angular";
import { ModalContent } from '../../../../features/user/exams/models/modal-content';
import { Stepper, StepList, Step, StepPanels, StepPanel } from "primeng/stepper";
import { ValidationError } from "../../../../features/auth/components/validation-error/validation-error";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from "../button/button";
import { Verify } from "../../../../features/auth/components/verify-otp/verify";
import { UpdateProfile } from '../../../../features/settings/services/update-profile';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

export type ModalType = 'exit' | 'restart' | 'explore' | 'OTP' | 'Delete';

@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule, Stepper, StepList, Step, StepPanels, StepPanel, ValidationError, ReactiveFormsModule, Button, Verify, Toast],
  providers: [MessageService],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() visible = false;
  @Input() type: ModalType | null = null;
  @Input() style: 'danger' | 'primary' = 'primary';
  @Input() content?: ModalContent | null = {
    icon: null,
    header: '',
    body: ''
  };
  @Input() confirmButton: string = 'Confirm';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() emailChanged = new EventEmitter<string>();

  readonly x = X;
  readonly chevronR = ChevronRight;
  private readonly fb = inject(FormBuilder);
  private readonly updateProfile = inject(UpdateProfile);
  private readonly messageService = inject(MessageService);
  newEmail: string = '';
  emailForm!: FormGroup;
  step: number = 1;
  isLoading: boolean = false;
  errorMessage: string = '';

  get emailControl() { return this.emailForm.get('email'); }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.step = 1;
    this.errorMessage = '';
    this.emailForm.reset();
    this.cancel.emit();
  }

  stepBack() {
    this.step--;
    this.errorMessage = '';
  }

  emailStepValidation() {
    if (this.emailControl?.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;
    const token = localStorage.getItem('token') || '';
    this.newEmail = this.emailControl!.value;

    this.updateProfile.requestEmailChange(token, this.newEmail).subscribe({
      next: (r) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: r.message || 'Verification code sent.', key: 'modal', life: 3000 });
        this.step++;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage = e.error?.message || 'Failed to send code. Please try again.';
      }
    });
  }

  verifyCode(code: string) {
    this.isLoading = true;
    this.errorMessage = '';
    const token = localStorage.getItem('token') || '';
    const email = this.emailControl!.value;

    this.updateProfile.confirmEmailChange(token, code).subscribe({
      next: () => {
        this.isLoading = false;
        this.emailChanged.emit(email);
        this.onCancel();
      },
      error: (e) => {
        this.isLoading = false;
        this.errorMessage = e.error?.message || 'Invalid code. Please try again.';
      }
    });
  }

  resendCode() {
    const token = localStorage.getItem('token') || '';
    const newEmail = this.emailControl!.value;
    this.updateProfile.requestEmailChange(token, newEmail).subscribe();
  }
}

import { Component, EventEmitter, inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { ChevronRight, LucideAngularModule, X } from "lucide-angular";
import { ModalContent } from '../../../../features/user/exams/models/modal-content';
import { Stepper, StepList, Step, StepPanels, StepPanel } from "primeng/stepper";
import { ValidationError } from "../../../../features/auth/components/validation-error/validation-error";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from "../button/button";
import { Verify } from "../../../../features/auth/components/verify-otp/verify";
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { isPlatformBrowser } from '@angular/common';

export type ModalType = 'exit' | 'restart' | 'explore' | 'OTP' | 'Delete';

@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule, Stepper, StepList, Step, StepPanels, StepPanel, ValidationError, ReactiveFormsModule, Button, Verify],
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

  readonly x = X;
  readonly chevronR = ChevronRight
  private readonly fb = inject(FormBuilder);
  emailForm!: FormGroup;

  step: number = 1;

  ngOnInit() {

    this.emailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })

  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  nextStep() {
    this.step++;
  }

  stepBack() {
    this.step--;
  }

  verifyCode() {
    // TODO: Implement OTP verification logic
    console.log('Verifying OTP...');
  }

  emailStepValidation() {
    if (this.emailForm.get('email')?.invalid) {
      this.emailForm.get('email')?.markAsTouched();
    } else {
      this.step++;
    }
  }

}
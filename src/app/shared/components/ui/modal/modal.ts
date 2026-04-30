import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, TriangleAlert, X } from "lucide-angular";
import { ModalContent } from '../../../../features/user/exams/models/modal-content';

export type ModalType = 'exit' | 'restart' | 'explore' | 'OTP'; 

@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() visible = false;
  @Input() type: ModalType | null = null;
  @Input() style: 'danger' | 'primary' = 'danger';
  @Input() content: ModalContent={
    icon: null,
    header: '',
    body: ''
  };

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  readonly x = X;

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}


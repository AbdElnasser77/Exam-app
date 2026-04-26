import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, TriangleAlert, X } from "lucide-angular";

@Component({
  selector: 'app-modal',
  imports: [LucideAngularModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() visible = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  readonly triangleAlert = TriangleAlert;
  readonly x = X;


  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}


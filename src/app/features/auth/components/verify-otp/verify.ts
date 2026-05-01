import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { InputOtpChangeEvent, InputOtpModule } from 'primeng/inputotp';
import { Countdown } from "../../../../shared/components/ui/countdown/countdown";

@Component({
  selector: 'otp-verify',
  imports: [LucideAngularModule, InputOtpModule, Countdown],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
})
export class Verify {
  readonly moveLeft = MoveLeft;
  @Input() email!: string;
  @Output() editReq = new EventEmitter<void>();
  @Output() nextStep = new EventEmitter<string>();
  @Output() resend = new EventEmitter<void>();

  showResend = false;
  showCountdown = true;

  editButton() {
    this.editReq.emit();
  }

  sendOTP(otpEvent: InputOtpChangeEvent) {
    if (otpEvent.value.length === 6) {
      this.nextStep.emit(otpEvent.value);
    }
  }

  onCountdownDone() {
    this.showResend = true;
  }

  onResend() {
    this.resend.emit();
    this.showResend = false;
    this.showCountdown = false;
    setTimeout(() => this.showCountdown = true, 0);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { ActivatedRoute } from "@angular/router";
import { InputOtpChangeEvent, InputOtpModule } from 'primeng/inputotp';
import { ResendTimerService } from '../../services/resend-timer-service';

@Component({
  selector: 'otp-verify',
  imports: [LucideAngularModule, InputOtpModule],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
})
export class Verify {
  readonly moveLeft = MoveLeft;
  @Input() email!: string;
  @Output() editReq = new EventEmitter<void>;
  @Output() nextStep = new EventEmitter<void>; 

  constructor(private activatedRoute: ActivatedRoute, private timer: ResendTimerService) { }

  editButton(){
    this.editReq.emit();
  }

  sendOTP(otpEvent:InputOtpChangeEvent){ // this will call the service later but now will be used for navigation
    if(otpEvent.value.length === 6){
      this.nextStep.emit();
    }
  }

}

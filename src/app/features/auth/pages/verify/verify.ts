import { Component, inject } from '@angular/core';
import { Button } from "../../../../shared/components/ui/button/button";
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { InputOtpModule } from 'primeng/inputotp';
import { ResendTimerService } from '../../services/resend-timer-service';

@Component({
  selector: 'app-verify',
  imports: [Button, LucideAngularModule, RouterLink, InputOtpModule],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
})
export class Verify {
  readonly moveLeft = MoveLeft;
  email?: string;

  constructor(private activatedRoute: ActivatedRoute,private timer:ResendTimerService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email']
    })

  }

}

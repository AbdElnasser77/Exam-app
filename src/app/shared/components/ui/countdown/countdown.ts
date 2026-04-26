import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-countdown',
  imports: [CountdownComponent],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  @Input() duration!:number;

  timeLeft = this.duration * 1000;
  radius = 40;
  circumference = 2 * Math.PI * this.radius;

  notifyTimes = 0; // not needed anymore

  handleEvent(e: any) {
    if (e.left !== undefined) {
      this.timeLeft = e.left;
    }
    if (e.action === 'done') {
      this.timeLeft = 0;
    }
  }

  get offset() {
    const durationMs = this.duration * 1000;
    const ratio = this.timeLeft / durationMs;
    return this.circumference * (1 - ratio);
  }
}

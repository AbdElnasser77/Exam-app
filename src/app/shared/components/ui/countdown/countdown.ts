import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-countdown',
  imports: [CountdownComponent],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  @Input() duration!: number; // milliseconds
  @Input() style: 'circle' | 'none' = 'circle';
  @Output() done = new EventEmitter<void>();

  timeLeft = 0;
  radius = 40;
  circumference = 2 * Math.PI * this.radius;
  notifyTimes = 0;

  ngOnInit() {
    this.timeLeft = this.duration;
  }

  handleEvent(e: any) {
    if (e.left !== undefined) {
      this.timeLeft = e.left;
    }
    if (e.action === 'done') {
      this.timeLeft = 0;
      this.done.emit();
    }
  }

  get offset() {
    const ratio = this.timeLeft / this.duration;
    return this.circumference * (1 - ratio);
  }
}

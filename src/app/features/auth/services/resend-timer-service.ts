import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResendTimerService {
  private _timeLeft = new BehaviorSubject<number>(0);
  timeLeft$ = this._timeLeft.asObservable();

  private subscription?: Subscription;

  start(seconds: number = 60) {
    if (this.subscription) return; 

    this._timeLeft.next(seconds);

    this.subscription = interval(1000)
      .pipe(takeWhile(() => this._timeLeft.value > 0))
      .subscribe(() => {
        const current = this._timeLeft.value - 1;
        this._timeLeft.next(current);

        if (current === 0) {
          this.subscription?.unsubscribe();
          this.subscription = undefined;
        }
      });
  }
}

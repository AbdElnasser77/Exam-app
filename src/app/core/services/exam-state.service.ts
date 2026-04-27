import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamStateService {
  private examMode = signal(false);

  setExamMode(value: boolean) {
    this.examMode.set(value);
  }

  isExamMode = this.examMode.asReadonly();
}

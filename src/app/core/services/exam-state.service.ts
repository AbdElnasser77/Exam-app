import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamStateService {
  private isExamModeControl = new BehaviorSubject<boolean>(false);

  isExamMode$ = this.isExamModeControl.asObservable();

  setExamMode(value: boolean) {
    this.isExamModeControl.next(value);
  }
  
}

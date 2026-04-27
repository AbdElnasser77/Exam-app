import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CircleQuestionMark, LucideAngularModule } from "lucide-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [LucideAngularModule],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {


  showExitModal:boolean = false;
  private readonly platformID = inject(PLATFORM_ID);
  private readonly router = inject(Router);



  readonly Questions = CircleQuestionMark;
  readonly chevronLeft = ChevronLeftIcon;
  readonly chevronRight = ChevronRightIcon;
  readonly check = CheckIcon;

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      const token = localStorage.getItem('token') ?? '';
      
        

    }
  }







  onBackAttempt() {
    this.showExitModal = true;
  }

  onCancelExit() {
    this.showExitModal = false;
  }

  onConfirmExit() {
    this.showExitModal = false;
    this.router.navigate(['/diplomas']);
  }
}

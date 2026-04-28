import { Component, ElementRef, inject, input, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CircleQuestionMark, LucideAngularModule, RotateCcw } from "lucide-angular";
import { Router } from '@angular/router';
import { DonutChart } from "../../../../../shared/components/ui/donut-chart/donut-chart";
import { Submission } from '../../models/submission';
import { Analytics } from '../../models/analytics';
import { RadioButton } from "primeng/radiobutton";
import { Question } from '../../models/questions';
import { FormsModule } from '@angular/forms';
import { Button } from "../../../../../shared/components/ui/button/button";

@Component({
  selector: 'app-results',
  imports: [LucideAngularModule, DonutChart, FormsModule, NgClass, Button],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})

export class Results {

  @Input() submissionData?: Submission;
  @Input() submissionAnalytics: Analytics[] = [];
  @Input() questionsArray: Question[] = [];


  submissionMap = new Map<string, []>();

  showExitModal: boolean = false;
  private readonly platformID = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly Question = CircleQuestionMark;
  readonly chevronLeft = ChevronLeftIcon;
  readonly chevronRight = ChevronRightIcon;
  readonly check = CheckIcon;
  readonly restart = RotateCcw;

  ngOnInit() {

    if (isPlatformBrowser(this.platformID)) {
      const token = localStorage.getItem('token') ?? '';
      console.log(this.submissionData);
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

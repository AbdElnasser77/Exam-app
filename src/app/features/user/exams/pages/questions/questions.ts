import { Question } from './../../models/questions';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from '../../../../../shared/components/ui/button/button';
import { Header } from '../../../../../shared/components/ui/header/header';
import { MenuItem } from 'primeng/api';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CircleQuestionMark, LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ExamService } from '../../services/exam.service';
import { Countdown } from '../../../../../shared/components/ui/countdown/countdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { QuestionsService } from '../../services/questions.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { Answers } from '../../models/answers';
import { ExamStateService } from '../../../../../core/services/exam-state.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Modal } from "../../../../../shared/components/ui/modal/modal";


@Component({
  selector: 'app-questions',
  imports: [Breadcrumb, Button, Header, LucideAngularModule, Countdown, ProgressBarModule, RadioButtonModule, FormsModule, ConfirmDialog, Modal],
  templateUrl: './questions.html',
  styleUrl: './questions.scss',
})
export class Questions {
  readonly Questions = CircleQuestionMark;
  readonly chevronLeft = ChevronLeftIcon;
  readonly chevronRight = ChevronRightIcon;
  readonly check = CheckIcon;

  items: MenuItem[] | undefined;
  Home: MenuItem[] | undefined;
  diplomaTitle: string = '';
  examTitle: string = 'loading.';
  examId: string = '';
  diplomaId: string = '';

  questions: Question[] = [];
  questionsCount: number = 0;

  currentQuestionIndex: number = 0;
  allAnswers: Answers[] = [];
  showExitModal = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly platformID = inject(PLATFORM_ID);
  private readonly examService = inject(ExamService);
  private readonly questionsService = inject(QuestionsService);
  private readonly router = inject(Router);
  private readonly examStateService = inject(ExamStateService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.examStateService.setExamMode(true);
    if (isPlatformBrowser(this.platformID)) {
      const token = localStorage.getItem('token') ?? '';

      this.activatedRoute.data.subscribe((data: any) => {
        this.diplomaTitle = data['diploma'].payload['diploma'].title;
      });

      this.activatedRoute.paramMap.subscribe((params) => {
        this.examId = params.get('examId') ?? '';
        this.diplomaId = params.get('diplomaId') ?? '';
      });

      this.questionsService.getExamQuestions(this.examId, token).subscribe({
        next: (res) => {

          this.questions = res.payload.questions;
          console.log(this.questions);
          this.allAnswers = this.questions.map((q) => ({
            questionId: q.id,
            answerId: ''
          }))
          console.log(this.allAnswers);
        }
      })

      this.examService.getExamById(token, this.examId).subscribe({
        next: (res) => {
          this.examTitle = res.payload.exam.title;
          this.items = [
            { label: 'Diplomas' },
            { label: this.diplomaTitle },
            { label: this.examTitle },
          ];
        },
      });
    }
  }

  ngOnDestroy() {
    this.examStateService.setExamMode(false);
  }


  nextQuestion() {
    this.currentQuestionIndex++;
  }
  previousQuestion() {
    this.currentQuestionIndex--;
  }

  submitExam() {
    console.log("all answers", this.allAnswers);
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

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

@Component({
  selector: 'app-questions',
  imports: [Breadcrumb, Button, Header, LucideAngularModule, Countdown, ProgressBarModule, RadioButtonModule, FormsModule],
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
  questionsCount: number = 0;
  questions: Question[] = [];
  
  currentQuestionIndex: number = 0;
  selectedAnswers: Answers[] = [];

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly platformID = inject(PLATFORM_ID);
  private readonly examService = inject(ExamService);
  private readonly questionsService = inject(QuestionsService);
  private readonly router = inject(Router);

  ngOnInit() {
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
        }
      })

      this.examService.getExamById(token, this.examId).subscribe({
        next: (res) => {
          this.examTitle = res.payload.exam.title;
          this.items = [
            { label: 'Diplomas', routerLink: '/diplomas' },
            { label: this.diplomaTitle, routerLink: `/diplomas/${this.diplomaId}/exams` },
            { label: this.examTitle },
          ];
        },
      });
    }
  }

  backButton() {
    this.router.navigate([`/diplomas/${this.diplomaId}/exams`]);
  }

  nextQuestion(){
    console.log(this.selectedAnswers);
    this.currentQuestionIndex++;
  }
  previousQuestion(){
    console.log(this.selectedAnswers);
    this.currentQuestionIndex--;
  }
}

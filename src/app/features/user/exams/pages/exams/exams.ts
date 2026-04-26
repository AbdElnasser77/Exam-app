import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Header } from "../../../../../shared/components/ui/header/header";
import { Button } from "../../../../../shared/components/ui/button/button";
import { ArrowRight, BookOpenCheck, CircleQuestionMark, Timer, LucideAngularModule, ChevronLeftIcon } from 'lucide-angular';
import { ExamService } from '../../services/exam.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Exam } from '../../models/exam';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-exams',
  imports: [Header, Button, LucideAngularModule, BreadcrumbModule, RouterLink],
  templateUrl: './exams.html',
  styleUrl: './exams.scss',
})
export class Exams {
  readonly BookOpenCheck = BookOpenCheck;
  readonly ArrowRight = ArrowRight;
  readonly chevronLeft = ChevronLeftIcon;
  readonly Questions = CircleQuestionMark;
  readonly Time = Timer;

  private readonly examService = inject(ExamService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly platform_ID = inject(PLATFORM_ID);

  exams: Exam[] = [];
  diplomaTitle: string = "loading...";
  hasExams: boolean = false;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit() {
    if (isPlatformBrowser(this.platform_ID)) {
      const token = localStorage.getItem('token') ?? '';
      const diplomaID = this.activatedRoute.snapshot.paramMap.get('diplomaId') ?? '';
   
      this.examService.getAllExams(token, diplomaID).subscribe({
        next: (res) => {
          this.exams = res.payload.data;
          if (this.exams.length > 0) {
            this.diplomaTitle = this.exams[0].diploma.title ?? "";
            this.hasExams = true;
            this.items = [{ label: 'Diplomas', routerLink: '/diplomas' }, { label: this.diplomaTitle }, { label: 'Exams'},];
          }
        }
      })
    }

  }

}

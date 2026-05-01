import { Component, ElementRef, EventEmitter, inject, input, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CircleQuestionMark, Compass, FolderSearch, LucideAngularModule, RotateCcw } from "lucide-angular";
import { Router } from '@angular/router';
import { DonutChart } from "../../../../../shared/components/ui/donut-chart/donut-chart";
import { Submission } from '../../models/submission';
import { Analytics } from '../../models/analytics';
import { RadioButton } from "primeng/radiobutton";
import { Question } from '../../models/questions';
import { FormsModule } from '@angular/forms';
import { Button } from "../../../../../shared/components/ui/button/button";
import { Modal, ModalType } from "../../../../../shared/components/ui/modal/modal";
import { ExamStateService } from '../../../../../core/services/exam-state.service';

@Component({
  selector: 'app-results',
  imports: [LucideAngularModule, DonutChart, FormsModule, NgClass, Button, Modal],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})

export class Results {

  @Input() submissionData?: Submission;
  @Input() submissionAnalytics: Analytics[] = [];
  @Input() questionsArray: Question[] = [];
  @Input() diplomaId: string = '';

  @Output() resetExam = new EventEmitter<void>();

  submissionMap = new Map<string, []>();

  isModalVisible: boolean = false;
  private readonly router = inject(Router);
  private readonly examStateService = inject(ExamStateService);

  readonly Question = CircleQuestionMark;
  readonly chevronLeft = ChevronLeftIcon;
  readonly chevronRight = ChevronRightIcon;
  readonly check = CheckIcon;
  readonly restart = RotateCcw;
  readonly folderSearch = FolderSearch;

  readonly restartModal = {
    icon: RotateCcw,
    header: 'Restart Exam ?',
    body: 'Are you sure you want to restart the exam?'
  };
  readonly ExploreModal = {
    icon: Compass,
    header: 'Explore Exams',
    body: 'Are you sure you want to leave this page?'
  };

  ngOnInit() {
    this.examStateService.setExamMode(false);
  }




  modalState = {
    visible: false,
    type: null as ModalType | null
  }

  openModal(type: ModalType) {
    this.modalState = {
      visible: true,
      type
    }
  }

  closeModal() {
    this.modalState = {
      visible: false,
      type: null
    }
  }

  onConfirm() {
    if (this.modalState.type === 'exit') {
      this.router.navigate(['/diplomas']);
    } else if (this.modalState.type === 'restart') {
      this.resetExam.emit();
    } else if (this.modalState.type === 'explore') {
      this.router.navigate([`/diplomas/${this.diplomaId}/exams`]);
    }

    this.closeModal();
  }

}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule } from "lucide-angular";
import { Sidebar } from "../../../shared/components/ui/sidebar/sidebar";
import { ExamStateService } from '../../../core/services/exam-state.service';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, LucideAngularModule, Sidebar],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {

private examStateService = inject(ExamStateService);
isExamMode = this.examStateService.isExamMode;

ngOnInit() {

}

}

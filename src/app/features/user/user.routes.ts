import { Routes } from '@angular/router';
import { UserLayout } from '../../layouts/user/user-layout/user-layout';
import { authRequiredGuard } from '../../core/guards/auth-required';
export const UserRoutes: Routes = [
  {
    path: '',
    component: UserLayout,
    canMatch:[authRequiredGuard],
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
      {
        path: 'diplomas',
        loadComponent: () => import('./pages/diplomas/diplomas').then((c) => c.Diplomas),
      },
      { path: 'exams', loadComponent: () => import('./pages/exam/exam').then((c) => c.Exam) },
      {
        path: 'exams/:id',
        loadComponent: () =>
          import('./pages/exam-questions/exam-questions').then((c) => c.ExamQuestions),
      },
    ],
  },
];

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
        loadComponent: () => import('./diplomas/pages/diplomas-home/diplomas-home').then((c) => c.DiplomasHome),
      },
      { path: 'exams', loadComponent: () => import('./exam/pages/exam/exam').then((c) => c.Exam) },
    ],
  },
];

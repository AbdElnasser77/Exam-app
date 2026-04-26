import { Routes } from '@angular/router';
import { UserLayout } from '../../layouts/user/user-layout/user-layout';
import { authRequiredGuard } from '../../core/guards/auth-required';
import { diplomaResolver } from './resolvers/diploma-resolver';

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
      { path: 'diplomas/:diplomaId/exams', loadComponent: () => import('./exams/pages/exams/exams').then((c) => c.Exams),resolve:{diploma:diplomaResolver} },
      { path: 'diplomas/:diplomaId/exams/:examId', loadComponent: () => import('./exams/pages/questions/questions').then((c) => c.Questions),resolve:{diploma:diplomaResolver} }
    ],
  },
];

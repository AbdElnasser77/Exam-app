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
      { path: 'diplomas/:id/exams', loadComponent: () => import('./exams/pages/exams/exams').then((c) => c.Exams) },
    ],
  },
];

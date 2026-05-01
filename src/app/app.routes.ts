import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AuthRoutes) },
  { path: 'reset-password', loadComponent: () => import('./features/auth/pages/password-reset/password-reset').then((m) => m.PasswordReset), title: 'Reset Password' },
  { path: '', loadChildren: () => import('./features/user/user.routes').then((m) => m.UserRoutes) },
  { path: '**', loadComponent: () => import('./shared/components/pages/not-found/not-found').then((m) => m.NotFound) }
];

import { Routes } from '@angular/router';
import { authRequiredGuard } from './core/guards/auth-required';

export const routes: Routes = [
  {path:'auth',loadChildren:()=>import('./features/auth/auth.routes').then((m)=>m.AuthRoutes)},
  {path:'',loadChildren:()=>import('./features/user/user.routes').then((m)=>m.UserRoutes)},
    {path:'**',loadComponent:()=>import('./shared/components/pages/not-found/not-found').then((m)=>m.NotFound)}
];

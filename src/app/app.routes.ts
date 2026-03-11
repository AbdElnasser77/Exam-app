import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadChildren:()=>import('./features/auth/auth.routes').then((m)=>m.AuthRoutes)},
    {path:'**',loadComponent:()=>import('./shared/components/pages/not-found/not-found').then((m)=>m.NotFound)}
];

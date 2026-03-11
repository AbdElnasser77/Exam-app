import { Routes } from "@angular/router";
import { AuthLayout } from "../../layouts/auth/auth-layout/auth-layout";

export const AuthRoutes:Routes = [
    {path:'',component:AuthLayout,
        children:[
            {path:'',redirectTo:'login',pathMatch:'full'},
            {path:'register',loadComponent:()=>import('./pages/register/register').then((c)=> c.Register), title:'Register'},
            {path:'login',loadComponent:()=>import('./pages/login/login').then((c)=>c.Login),title:'Login'},
            {path:'verify',loadComponent:()=>import('./pages/verify/verify').then((c)=>c.Verify),title:'Verify'},
            {path:'forgot-password',loadComponent:()=>import('./pages/forgot-password/forgot-password').then((c)=>c.ForgotPassword),title:'Forgot Password'},
            {path:'create-password',loadComponent:()=>import('./pages/create-password/create-password').then((c)=>c.CreatePassword),title:'Create Password'},
            {path:'reset-password',loadComponent:()=>import('./pages/password-reset/password-reset').then((c)=>c.PasswordReset),title:'Reset Password'},
        ]
    }
]
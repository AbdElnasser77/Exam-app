import { Routes } from "@angular/router";
import { SettingsLayout } from "../../layouts/settings/settings-layout/settings-layout";

export const SettingsRoutes:Routes = [
    {path:'',component:SettingsLayout,
        children:[
            {path:'',redirectTo:'profile',pathMatch:'full'},
            {path:'profile',loadComponent:()=>import('./pages/profile/profile').then((c)=>c.Profile)},
            {path:'change-password',loadComponent:()=>import('./pages/change-password/change-password').then((c)=>c.ChangePassword)},
        ]
    }
]
import { Routes } from '@angular/router';
import { ListProfComponent } from './pages/Professeur/list-prof/list-prof.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListClasseComponent } from './pages/Professeur/list-classe/list-classe.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { LayoutVideComponent } from './components/layout-vide/layout-vide.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AbscencesComponent } from './pages/abscences/abscences.component';
import { authGuard } from './pages/guards/auth.guard';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'professeur/list-prof',
        component: LayoutComponent,
        children: [
            { path: '', component: ListProfComponent },

        ],
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LayoutVideComponent,
        children: [
            { path: '', component: LoginPageComponent },
        ],
        
    },
    {
        path: 'abscences',
        component: LayoutComponent,
        children: [
            { path: '', component: AbscencesComponent },
        ],
        canActivate: [authGuard]
    },


    {
        path: 'professeur',
        children: [
            {
                path: '',
                component: ListProfComponent
            },
            {
                path: 'classes/:id',
                component: ListClasseComponent
            },
            {
                path: 'planning/:id',
                component: PlanningComponent
            },

        ]
    },
];

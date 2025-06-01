import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantsListComponent } from './home/etudiantList/etudiants-list.component';
import { EtudiantDetailComponent } from './home/etudiantDetail/etudiant-detail.component';
import { EtudiantResolver } from './core/resolvers/etudiant.resolver.resolver';


const routes: Routes = [
  {
    path: 'etudiants',
    component: EtudiantsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'etudiants/:id',
    component: EtudiantDetailComponent,
    resolve: {
      etudiant: EtudiantResolver
    },
    canActivate: [AuthGuard]
  }
];

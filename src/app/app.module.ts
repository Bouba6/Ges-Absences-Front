// src/app/app.module.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { TypeHighlightDirective } from './directives/type-highlight.directive';
import { StudentDetailComponent } from './student-detail/student-detail.component';

import { AuthGuard } from './core/guards/auth.guard';
import { StudentResolver } from './core/resolvers/student.resolver';
import { AuthService } from './core/services/auth.service';
import { StudentService } from './core/services/student.service';
import { StudentStore } from './core/stores/student.store';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    FormsModule,
    ReactiveFormsModule,
    AuthGuard,
    StudentResolver,
    StudentService,
    StudentStore,
    AuthService
  ]
});

export class AppModule {} // Classe vide pour la compatibilité avec les outils de développement

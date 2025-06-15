// auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');

  // Si le token existe, l'accès est autorisé
  if (token) {
    return true;
  }

  // Sinon, redirige vers /login
  return inject(Router).createUrlTree(['/login']);
};

// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  role: 'Admin' | 'User';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>({
    id: 'admin123',
    name: 'Administrateur',
    role: 'Admin'
  });

  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  loginAsAdmin(): void {
    this.currentUserSubject.next({ id: 'admin123', name: 'Administrateur', role: 'Admin' });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}

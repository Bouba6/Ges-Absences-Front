// src/app/core/resolvers/student.resolver.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentStore } from '../stores/student.store';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<unknown> {
  constructor(private studentStore: StudentStore) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    const id = route.paramMap.get('id');
    if (id) {
      this.studentStore.loadStudent(id);
      this.studentStore.loadAbsences(id);
    }
    return of(null);
  }
}

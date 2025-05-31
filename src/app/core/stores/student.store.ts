// src/app/core/stores/student.store.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Absence, Student } from '../../models/student.model';
import { StudentService } from '../services/student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentStore {
  private _studentSubject = new BehaviorSubject<Student | null>(null);
  private _absencesSubject = new BehaviorSubject<Absence[]>([]);

  readonly student$ = this._studentSubject.asObservable();
  readonly absences$ = this._absencesSubject.asObservable();

  constructor(private studentService: StudentService) {}

  loadStudent(id: string): void {
    this.studentService.getStudent(id).subscribe({
      next: (stu) => this._studentSubject.next(stu),
      error: (err) => {
        console.error('Erreur loading student', err);
        this._studentSubject.next(null);
      }
    });
  }

  loadAbsences(id: string): void {
    this.studentService.getAbsences(id).subscribe({
      next: (abs) => this._absencesSubject.next(abs),
      error: (err) => {
        console.error('Erreur loading absences', err);
        this._absencesSubject.next([]);
      }
    });
  }
}

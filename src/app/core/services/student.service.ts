// src/app/core/services/student.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence, Student } from '../../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = '/api/students';

  constructor(private http: HttpClient) {}

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  getAbsences(id: string): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseUrl}/${id}/absences`);
  }
}

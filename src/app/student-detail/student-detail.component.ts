// src/app/student-detail/student-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TypeHighlightDirective } from '../directives/type-highlight.directive';

import { StudentStore } from '../core/stores/student.store';
import { Absence, Student } from '../models/student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  imports: [
    CommonModule,
    TypeHighlightDirective
  ]
})
export class StudentDetailComponent implements OnInit {
  student$!: Observable<Student | null>;
  absences$!: Observable<Absence[]>;
  selectedJustification: Absence | null = null;

  constructor(
    private studentStore: StudentStore,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.student$ = this.studentStore.student$;
    this.absences$ = this.studentStore.absences$;
  }

  openJustification(abs: Absence): void {
    this.selectedJustification = abs;
  }

  closeJustification(): void {
    this.selectedJustification = null;
  }

  validateJustification(): void {
    this.closeJustification();
  }

  rejectJustification(): void {
    this.closeJustification();
  }
}



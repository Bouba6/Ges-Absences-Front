import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { StudentStore } from '../core/stores/student.store';
import { Student } from '../models/student.model';
import { Router } from '@angular/router';

interface Absence {
  date: string;
  subject: string;
  type: 'Absence' | 'Retard';
  justification?: 'Maladie' | 'Décès' | 'Embouteillage';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  absences: Absence[] = [
    { date: '2025-05-30', subject: 'Mathématiques', type: 'Absence', justification: 'Maladie' },
    { date: '2025-05-28', subject: 'Physique',     type: 'Absence', justification: 'Décès' },
    { date: '2025-05-25', subject: 'Informatique', type: 'Retard',  justification: 'Embouteillage' },
    { date: '2025-05-22', subject: 'Chimie',       type: 'Retard' },
    { date: '2025-05-20', subject: 'Français',     type: 'Absence' },
    { date: '2025-05-15', subject: 'Anglais',      type: 'Retard',  justification: 'Maladie' }
  ];

  // Statistiques détaillées
  stats = {
    totalAbsences: 45,
    totalRetards: 28,
    justifiedAbsences: 22,
    pendingJustifications: 7,
    averageAbsencePerStudent: '0.37',
    mostAbsentSubject: 'Mathématiques',
    mostAbsentMonth: 'Mai'
  };

  // Données de démonstration pour le tableau
  totalStudents = 123;
  todayAbsences = 15;
  pendingJustifications = 7;

  student$!: Observable<Student | null>;
  selectedAbsence: Absence | null = null;

  constructor(
    private studentStore: StudentStore,
    private router: Router
  ) {
    this.student$ = this.studentStore.student$;
    this.studentStore.student$.subscribe((student: Student | null) => {
      if (student) {
        this.absences = student.absences || [];
      }
    });
  }

  ngOnInit(): void {
    this.studentStore.loadStudent('1'); // Charger le premier étudiant pour l'exemple
  }

  viewStudentDetails(studentId: number): void {
    this.router.navigate(['/students', studentId]);
  }

  openJustification(absence: Absence): void {
    this.selectedAbsence = absence;
    console.log('Opening justification:', this.selectedAbsence);
  }

  closeJustification(): void {
    this.selectedAbsence = null;
  }
}
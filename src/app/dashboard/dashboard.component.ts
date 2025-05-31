import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Absence {
  date: string;
  subject: string;
  type: 'Absence' | 'Retard';
  justification?: 'Maladie' | 'Décès' | 'Embouteillage';
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
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

  constructor() {}

  ngOnInit(): void {
    // À implémenter : appels aux services pour récupérer les données réelles
  }

  openJustification(abs: Absence): void {
    // Mettez ici la logique pour ouvrir un popup ou une modal
    console.log('Afficher popup pour:', abs);
  }
}
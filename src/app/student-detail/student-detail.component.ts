// src/app/student-detail/student-detail.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { StudentStore } from '../core/stores/student.store';
import { Absence, Student } from '../models/student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class StudentDetailComponent implements OnInit {
  student$!: Observable<Student | null>;
  absences$!: Observable<Absence[]>;

  // Pour le popup de justification
  showJustifPopup = false;
  showViewJustif = false;
  selectedAbsence: Absence | null = null;

  // Formulaire de justification
  justificationForm!: FormGroup;

  // Pour garder un tableau local modifiable (on fait buffer des absences dans un BehaviorSubject)
  private _absencesSubject = new BehaviorSubject<Absence[]>([]);
  absencesBuffer$ = this._absencesSubject.asObservable();



  constructor(
    private studentStore: StudentStore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire
    this.justificationForm = this.fb.group({
      justification: ['', Validators.required],
      comment: ['']
    });

    // Obtenir les absences et les mettre dans le buffer
    this.absences$.subscribe(absList => {
      const clone = absList.map(a => ({ ...a, isJustified: a.justification ? true : false }));
      this._absencesSubject.next(clone);
    });
  }

  ngOnInit(): void {
    // Le resolver a déjà chargé les données dans le store
    this.student$ = this.studentStore.student$;
    this.absences$ = this.studentStore.absences$;

    // On copie les absences du store dans un subject (pour modification locale)
    this.absences$.subscribe(absList => {
      // on clone pour ne pas modifier directement le store
      const clone = absList.map(a => ({ ...a, isJustified: a.justification ? true : false }));
      this._absencesSubject.next(clone);
    });
  }

  // Méthodes pour la visualisation des justifications
  viewJustification(abs: Absence): void {
    this.selectedAbsence = abs;
    this.showViewJustif = true;
  }

  closeViewJustif(): void {
    this.selectedAbsence = null;
    this.showViewJustif = false;
  }

  // Méthodes pour le popup de justification
  openJustificationPopup(abs: Absence): void {
    this.selectedAbsence = abs;
    this.justificationForm.reset();
    this.showJustifPopup = true;
  }

  closeJustificationPopup(): void {
    this.selectedAbsence = null;
    this.justificationForm.reset();
    this.showJustifPopup = false;
  }

  confirmJustification(): void {
    if (this.selectedAbsence && this.justificationForm.valid) {
      const formValue = this.justificationForm.value;
      
      // On crée une copie de l'absence avec la nouvelle justification
      const updatedAbsence = {
        ...this.selectedAbsence,
        justification: formValue.justification as 'Maladie' | 'Décès' | 'Embouteillage',
        justificationComment: formValue.comment || ''
      };

      // On trouve l'index de l'absence dans le tableau
      const index = this._absencesSubject.value.findIndex((a: Absence) => a === this.selectedAbsence);
      if (index !== -1) {
        // On met à jour le tableau dans le BehaviorSubject
        const absences = [...this._absencesSubject.value];
        absences[index] = updatedAbsence;
        this._absencesSubject.next(absences);
      }

      // On ferme le popup
      this.closeJustificationPopup();

      // TODO: Envoyer la mise à jour au backend via StudentStore
    }

    // (Optionnel) Ici, on pourrait appeler un service pour sauvegarder la justification côté serveur
    // ex. this.studentStore.updateJustification(this.studentId, updatedAbs).subscribe();
  }

  // Getter pratique pour embedder dans le template
  get absencesForDisplay(): Absence[] {
    return this._absencesSubject.getValue();
  }
}



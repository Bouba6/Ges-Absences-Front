// src/app/models/student.model.ts

export interface Student {
  id: string;
  name: string;
  promotion: string;
  role: string;
  absences?: Absence[];
}

export type AbsenceType = 'Absence' | 'Retard';

// src/app/models/student.model.ts

export interface Absence {
  date: string;
  subject: string;
  type: 'Absence' | 'Retard';
  justification?: 'Maladie' | 'Décès' | 'Embouteillage'; // statut final (déjà justifié)
  justificationComment?: string; // commentaire libre saisi par l’admin
  isJustified?: boolean;           // vrai si on a déjà cliqué sur “Justifier”
}

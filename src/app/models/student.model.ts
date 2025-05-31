// src/app/models/student.model.ts

export interface Student {
  id: string;
  name: string;
  promotion: string;
  role: string;
}

export type AbsenceType = 'Absence' | 'Retard';

export interface Absence {
  date: string;
  subject: string;
  type: AbsenceType;
  justification?: string;
  justificationLink?: string;
}

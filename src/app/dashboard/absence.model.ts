export interface Absence {
  date: string;
  subject: string;
  type: 'Absence' | 'Retard';
  justification?: string;
}

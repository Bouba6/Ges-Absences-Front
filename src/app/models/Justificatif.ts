// justificatif.model.ts
export interface JustificatifDetails {
  id: string;
  justificatif: string;
  abscenceId: string;
  statutJustification: 'REJETEE' | 'VALIDE' | 'EN_ATTENTE';
  typeAbscence: 'Absent' | 'Retard';
  nomEleve: string;
  nomCours: string;
  statutAbscence: 'JUSTIFIER' | 'NON_JUSTIFIER';
  imgUrl: [];

}

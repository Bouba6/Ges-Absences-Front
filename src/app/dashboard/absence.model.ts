
export interface Absence {
  date: string;
  subject: string;
  type: 'Absence' | 'Retard';
  justification?: 'Maladie' | 'Décès' | 'Embouteillage'; // statut final (déjà justifié)
  justificationComment?: string; // commentaire libre saisi par l’admin
  isJustified?: boolean;           // vrai si on a déjà cliqué sur “Justifier”
}

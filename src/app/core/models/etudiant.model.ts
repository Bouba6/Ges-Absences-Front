export interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  batiment: string;
  niveau: string;
  filiere: string;
}

export interface EtudiantResponse {
  data: Etudiant[];   // La liste des étudiants
  total: number;      // Nombre total d'étudiants
  page: number;       // Page actuelle
  limit: number;      // Nombre d'étudiants par page
}

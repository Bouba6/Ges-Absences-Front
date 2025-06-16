export interface AbscenceResponse {
  id: string;
  idJustification: string | null;
  statutJustificatif:string|null;
  nomCours: string;
  typeAbscence: string;
  statutAbscence: string;
  nomEleve: string;
}

export interface AbscenceApiResponse {
  totalItems: number;
  pages: number[];
  last: boolean;
  totalPages: number;
  currentPage: number;
  type: string;
  results: AbscenceResponse[];
  first: boolean;
  status: number;
}

import { Classe } from "./Classe";
import { Eleve } from "./Eleve";

export interface DetailResponse {
    classe: Classe;
    etudiants: Eleve[];
}
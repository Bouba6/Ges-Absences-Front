import { module } from "./module";

export interface Professeur {
    id: number;
    Nom: string;
    prenom: string
    email: string
    dateNaissance: Date
    sexe: string
    adresse: string
    ville: string
    // image: string
    professeurModules: module[]

}

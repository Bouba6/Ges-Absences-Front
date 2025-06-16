import { Observable } from "rxjs";

import { RestResponse } from "../models/RestResponse";
import { Professeur } from "../models/Professeur";

export interface IProfesseurService{

    create(object: Professeur): Observable<RestResponse<Professeur>>;
    delete(id: number): void;
    update(id: number, object: Professeur): Observable<RestResponse<Professeur>>;
    findById(id: number): Observable<RestResponse<Professeur>>;
    findAll(size: number, page: number): Observable<RestResponse<Professeur[]>>;


}
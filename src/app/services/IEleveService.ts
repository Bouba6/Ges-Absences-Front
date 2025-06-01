import { Observable } from "rxjs";

import { RestResponse } from "../models/RestResponse";
import { Eleve } from "../models/Eleve";

export interface IEleveService {

    create(object: Eleve): Observable<RestResponse<Eleve>>;
    delete(id: number): void;
    update(id: number, object: Eleve): Observable<RestResponse<Eleve>>;
    findById(id: number): Observable<RestResponse<Eleve>>;
    findAll(size: number, page: number): Observable<RestResponse<Eleve[]>>;


}
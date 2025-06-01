import { Observable } from "rxjs";

import { RestResponse } from "../models/RestResponse";
import { Cours } from "../models/Cours";

export interface IEmploiService {

    create(object: Cours): Observable<RestResponse<Cours>>;
    delete(id: number): void;
    update(id: number, object: Cours): Observable<RestResponse<Cours>>;
    findById(id: number): Observable<RestResponse<Cours>>;
    findAll(size: number, page: number): Observable<RestResponse<Cours[]>>;


}
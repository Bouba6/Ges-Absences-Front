import { Observable } from "rxjs";

import { RestResponse } from "../models/RestResponse";
import { Classe } from '../models/Classe';

export interface IClasseService {

    create(object: Classe): Observable<RestResponse<Classe>>;
    delete(id: number): void;
    update(id: number, object: Classe): Observable<RestResponse<Classe>>;
    findById(id: number): Observable<RestResponse<Classe>>;
    findAll(size: number, page: number): Observable<RestResponse<Classe[]>>;


}
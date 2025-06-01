
import { Observable } from "rxjs";

import { RestResponse } from "../models/RestResponse";
import { AbscenceApiResponse } from '../models/Abscence';
import { JustificatifDetails } from "../models/Justificatif";

export interface IAbscenceService {
    // create(object: Abscence): Observable<RestResponse<Abscence>>;
    // update(id: number, object: Abscence): Observable<RestResponse<Abscence>>;
    // findById(id: number): Observable<RestResponse<Abscence>>;
    selectAll(size: number, page: number): Observable<AbscenceApiResponse>;
    getJustificatif(absenceId: string): Observable<{ results: JustificatifDetails }>
  
}
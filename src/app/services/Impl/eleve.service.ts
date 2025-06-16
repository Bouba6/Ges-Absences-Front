import { Observable } from "rxjs";
import { Cours } from "../../models/Cours";
import { Eleve } from "../../models/Eleve";
import { RestResponse } from "../../models/RestResponse";
import { IEleveService } from '../IEleveService';
import { GenericService } from "./generic.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";


export class EleveService extends GenericService<Eleve> implements IEleveService {

    constructor(http: HttpClient,
    ) {
        super(http)
        this.endpoint = 'eleve'
        this.apiUrl = `${environment.apiUrl}/${this.endpoint}`
    }


    getClassesByProfesseurId(id: number): Observable<RestResponse<Eleve[]>> {
        return this.http.get<RestResponse<Eleve[]>>(`${this.apiUrl}/professeur/${id}`);
    }

   
} 
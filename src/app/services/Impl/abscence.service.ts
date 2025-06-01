import { HttpClient } from "@angular/common/http"
import { AbscenceApiResponse } from "../../models/Abscence"
import { IAbscenceService } from "../IAbscenceService"
import { GenericService } from "./generic.service"
import { environment } from "../../../environments/environment.development"
import { Injectable } from "@angular/core"
import { RestResponse } from "../../models/RestResponse"
import { Observable } from "rxjs"
import { JustificatifDetails } from "../../models/Justificatif"

@Injectable({
    providedIn: 'root',
})
export class AbscenceService extends GenericService<AbscenceApiResponse> implements IAbscenceService {

    constructor(http: HttpClient,
    ) {
        super(http)
        this.endpoint = 'abscences'
        this.apiUrl = `${environment.apiUrl}/${this.endpoint}`
    }
    getJustificatif(absenceId: string): Observable<{ results: JustificatifDetails }> {
        return this.http.get<{ results: JustificatifDetails }>(`${this.apiUrl}/update/${absenceId}`);
    }
    selectAll(): Observable<AbscenceApiResponse> {
        return this.http.get<AbscenceApiResponse>(this.apiUrl);
    }

    postJustificationValidation(id: string, payload: {
        statutJustificatif: 'VALIDE' | 'REJETEE'
    }) {
        return this.http.put(`${environment.apiUrl}/justificatif/abscence/${id}`, payload);
    }






}
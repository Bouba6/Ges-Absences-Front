import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { AbscenceApiResponse } from "../../models/Abscence"
import { IAbscenceService } from "../IAbscenceService"
import { GenericService } from "./generic.service"
import { environment } from "../../../environments/environment.development"
import { Injectable } from "@angular/core"
import { RestResponse } from "../../models/RestResponse"
import { Observable } from "rxjs"
import { JustificatifDetails } from "../../models/Justificatif"
import { CookieService } from "ngx-cookie-service"

@Injectable({
    providedIn: 'root',
})
export class AbscenceService extends GenericService<AbscenceApiResponse> implements IAbscenceService {

    constructor(http: HttpClient, private cookieService: CookieService
    ) {
        super(http)
        this.endpoint = 'abscences'
        this.apiUrl = `${environment.apiUrl}/${this.endpoint}`
    }
    getJustificatif(absenceId: string): Observable<{ results: JustificatifDetails }> {
        return this.http.get<{ results: JustificatifDetails }>(`${this.apiUrl}/update/${absenceId}`);
    }
    selectAll(): Observable<AbscenceApiResponse> {
        return this.http.get<AbscenceApiResponse>(this.apiUrl, {
            withCredentials: true
        });
    }

    private getAuthHeaders(): HttpHeaders {
        const token = this.cookieService.get('jwt_token'); // ou sessionStorage
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }

    postJustificationValidation(id: string, payload: {
        statutJustificatif: 'VALIDE' | 'REJETEE'
    }) {
        return this.http.put(`${environment.apiUrl}/justificatif/abscence/${id}`, payload);
    }


    selectAll1(page: number = 0, size: number = 6): Observable<AbscenceApiResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<AbscenceApiResponse>(`${this.apiUrl}/filter`, { params, withCredentials: true },);
    }

    // Méthode pour récupérer les absences avec filtre par statut
    getAbscencesByStatus(statutAbscence: string, page: number = 0, size: number = 6, withCredentials: boolean = true): Observable<AbscenceApiResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('statutAbscence', statutAbscence);

        return this.http.get<AbscenceApiResponse>(`${this.apiUrl}/filter`, { params, withCredentials },);
    }

    // Méthodes spécifiques pour les deux statuts
    getJustifiedAbscences(page: number = 0, size: number = 6): Observable<AbscenceApiResponse> {
        return this.getAbscencesByStatus('JUSTIFIER', page, size);
    }

    getNonJustifiedAbscences(page: number = 0, size: number = 6): Observable<AbscenceApiResponse> {
        return this.getAbscencesByStatus('NON_JUSTIFIER', page, size);
    }






}
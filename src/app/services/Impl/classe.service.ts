import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { environment } from '../../../environments/environment.development';
import { RestResponse } from '../../models/RestResponse';
import { Observable } from 'rxjs';
import { Classe } from '../../models/Classe';
import { IClasseService } from '../IClasseServcice';
import { DetailResponse } from '../../models/DetailResponse';

@Injectable({
    providedIn: 'root',
})
export class ClasseService extends GenericService<Classe> implements IClasseService {

    constructor(http: HttpClient,
    ) {
        super(http)
        this.endpoint = 'classes'
        this.apiUrl = `${environment.apiUrl}/${this.endpoint}`
    }

    getClassesByProfesseurId(id: string): Observable<RestResponse<Classe[]>> {
        return this.http.get<RestResponse<Classe[]>>(`${this.apiUrl}/professeur/${id}`);
    }

    getClassesId(id: number, page: number): Observable<RestResponse<DetailResponse>> {
        return this.http.get<RestResponse<DetailResponse>>(`${this.apiUrl}/detail/${id}?page=${page}`);
    }
}
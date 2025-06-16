import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../../models/Cours';
import { IEmploiService } from '../IEmploiService';
import { GenericService } from './generic.service';
import { environment } from '../../../environments/environment.development';
import { RestResponse } from '../../models/RestResponse';

@Injectable({
    providedIn: 'root'
})
export class EmploidutempsService extends GenericService<Cours> implements IEmploiService {

    constructor(http: HttpClient,
    ) {
        super(http)
        this.endpoint = 'cours'
        this.apiUrl = `${environment.apiUrl}/${this.endpoint}`
    }

    getEmploiDuTemps(id: string, startDate: string, endDate: string): Observable<RestResponse<Cours[]>> {
        return this.http.get<RestResponse<Cours[]>>(`${this.apiUrl}/professeur/${id}?startDate=${startDate}&endDate=${endDate}`);
    }



}

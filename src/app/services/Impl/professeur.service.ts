import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Professeur } from '../../models/Professeur';
import { IProfesseurService } from '../IProfesseurService';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class professeurService extends GenericService<Professeur> implements IProfesseurService {

    constructor(http: HttpClient,
    ) {
        super(http)
        this.endpoint = 'professeurs'
        this.apiUrl = `${environment.apiUrl}/${this.endpoint}`
    }

    // getArticles(page: number): Observable<Article[]> {
    //     return this.http.get<any>(`${this.apiUrl}?page=${page} &size=10`);
    // }


}
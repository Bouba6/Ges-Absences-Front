import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { User } from '../../models/User';
import { ILoginService } from '../ILoginService';
import { environment } from "../../../environments/environment.development"

@Injectable({
    providedIn: 'root'
})
export class LoginService extends GenericService<User> implements ILoginService {

    private apiUrl1 = 'https://ges-abscences-backend.onrender.com/api/auth'; // Base de l'API

    constructor(http: HttpClient) {
        super(http)
        this.endpoint = 'abscences'
        this.apiUrl = `${environment.apiUrl}/${this.endpoint}`
    }
    SelectByLoginPassword(login: string, password: string): Observable<HttpResponse<User>> {
        const body = { login, password };
        console.log('[AuthService] Requête login envoyée avec :', body);

        return this.http.post<User>(`${this.apiUrl1}/login`, body, {
            observe: 'response'
        });
    }




}

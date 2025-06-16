// auth.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private cookieService: CookieService,
        private http: HttpClient
    ) { }

    // Stocker le token JWT
    setToken(token: string) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        this.cookieService.set('jwt_token', token, {
            expires,
            path: '/',
            secure: true,
            sameSite: 'Strict'
        });
    }

    // Récupérer le token
    getToken(): string {
        return this.cookieService.get('jwt_token');
    }

    // Supprimer le token
    removeToken() {
        this.cookieService.delete('jwt_token', '/');
    }

    // Vérifier si connecté
    isLoggedIn(): boolean {
        return this.cookieService.check('jwt_token');
    }
}
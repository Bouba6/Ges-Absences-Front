import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- À ajouter
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../services/Impl/Login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/Impl/auth.service';
@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  isLoading: boolean = false;
  login: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService, private authService: AuthService) { }
  onSubmit() {
    this.isLoading = true;
    const body = {
      login: this.login,
      password: this.password
    };

    console.log('[Auth] Envoi de la requête login avec body :', JSON.stringify(body));

    this.loginService.SelectByLoginPassword(this.login, this.password)
      .subscribe({
        next: (httpResponse) => {
          this.isLoading = false;
          console.log('[Auth] Réponse reçue (status)', httpResponse.status);
          console.log('[Auth] Headers reçus :', httpResponse.headers.keys().map(key => `${key}=${httpResponse.headers.get(key)}`));
          console.log('[Auth] Body de la réponse :', httpResponse.body);

          const token = httpResponse.body!.token;

          // ✅ Enregistre le token dans le cookie sécurisé
          this.authService.setToken(token);
          console.log('[Auth] Token sauvegardé dans cookie');
          this.testCookieAndCall();
          // ✅ Redirection après succès
          this.router.navigate(['abscences']);
        },
        error: (err) => {
          console.error('[Auth] Erreur de connexion : statut=', err.status);
          console.error('[Auth] Détail de l’erreur :', err);
          this.isLoading = false;

          if (err.error) {
            console.error('[Auth] Corps de l’erreur retournée par le serveur :', err.error);
          }

          if (err.status === 0) {
            console.warn('[Auth] Il est probable que ce soit une erreur CORS (status 0)');
          }

          alert("Échec de connexion ! (voir console pour plus de détails)");
        }
      });
  }


  testCookieAndCall() {
    console.log('🍪 Cookies dans le navigateur:', document.cookie);

    // Test avec l'URL complète et plus de logs
    this.http.get('https://ges-abscences-backend.onrender.com/api/v1/abscences/filter?page=0&size=3', {
      withCredentials: true
    }).subscribe({
      next: (data) => {
        console.log('✅ Appel réussi:', data);
      },
      error: (error) => {
        console.log('❌ Erreur complète:', error);
        console.log('Status:', error.status);
        console.log('StatusText:', error.statusText);
        console.log('Error body:', error.error);
        console.log('URL appelée:', error.url);
      }
    });
  }


}

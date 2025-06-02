import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- À ajouter
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  login: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router) { }
  onSubmit() {
    const body = {
      login: this.login,
      password: this.password
    };

    // Log du payload avant envoi
    console.log('[Auth] Envoi de la requête login avec body :', JSON.stringify(body));

    this.http.post<any>('https://ges-abscences-backend.onrender.com/api/auth/login', body, {
      observe: 'response' // pour récupérer aussi les headers/status
    })
      .subscribe({
        next: (httpResponse) => {
          // httpResponse est de type HttpResponse<any>
          console.log('[Auth] Réponse reçue (status)', httpResponse.status);
          console.log('[Auth] Headers reçus :', httpResponse.headers.keys().map(key => `${key}=${httpResponse.headers.get(key)}`));
          console.log('[Auth] Body de la réponse :', httpResponse.body);

          const token = httpResponse.body.token;
          localStorage.setItem('authToken', token);
          console.log('[Auth] Token sauvegardé dans localStorage');

          this.router.navigate(['professeur/list-prof']);
        },
        error: (err) => {
          console.error('[Auth] Erreur de connexion : statut=', err.status);
          console.error('[Auth] Détail de l’erreur :', err);

          // Si le backend renvoie un corps JSON (ex. { message: "...", ... })
          if (err.error) {
            console.error('[Auth] Corps de l’erreur retournée par le serveur :', err.error);
          }

          // Si c’est une erreur CORS, err.status sera souvent 0
          if (err.status === 0) {
            console.warn('[Auth] Il est probable que ce soit une erreur CORS (status 0)');
          }

          alert("Échec de connexion ! (voir console pour plus de détails)");
        }
      });
  }

}

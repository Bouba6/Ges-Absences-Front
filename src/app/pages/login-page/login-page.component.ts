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

    this.http.post<any>('https://ges-abscences-backend.onrender.com/api/auth/login', body).subscribe({
      next: (response) => {
        const token = response.token;
        // Sauvegarde du token dans le localStorage
        localStorage.setItem('authToken', token);

        // Rediriger vers un layout protégé
        this.router.navigate(['professeur/list-prof']); // ou autre route sécurisée
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        alert("Échec de connexion !");
      }
    });
  }
}

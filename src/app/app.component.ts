import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Déclare ce composant comme autonome
  imports: [RouterModule, RouterOutlet, CommonModule, NavbarComponent, FooterComponent],  // Inclut RouterModule pour gérer les routes et CommonModule pour les directives
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionabscences';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout-article',
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, SidebarComponent,FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}

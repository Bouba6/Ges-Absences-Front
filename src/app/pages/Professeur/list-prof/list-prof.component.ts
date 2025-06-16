import { Component, OnInit } from '@angular/core';
import { Professeur } from '../../../models/Professeur';
import { CommonModule, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { professeurService } from '../../../services/Impl/professeur.service';


@Component({
  selector: 'app-list-prof',
  imports: [CommonModule],
  templateUrl: './list-prof.component.html',
  styleUrl: './list-prof.component.css'
})
export class ListProfComponent implements OnInit {

  professeurs$: Observable<any> = new Observable();
  constructor(private readonly professeurService: professeurService) { }
  ngOnInit(): void {
    this.professeurs$ = this.professeurService.findAll();
    console.log('gars tu me fais quoi la ?')
    this.professeurs$.subscribe(professeurs => {
     
      console.log(professeurs)
    }
    );

  }

  voirClasses(prof: Professeur) {
    window.location.href = `http://localhost:4200/professeur/classes/${prof.id}`;
  }
}

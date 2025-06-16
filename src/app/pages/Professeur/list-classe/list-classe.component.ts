import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { professeurService } from '../../../services/Impl/professeur.service';
import { ClasseService } from '../../../services/Impl/classe.service';
@Component({
  selector: 'app-list-classe',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-classe.component.html',
  styleUrl: './list-classe.component.css'
})
export class ListClasseComponent implements OnInit {
  constructor(private readonly classeService: ClasseService, private readonly route: ActivatedRoute, private readonly ProfesseurService: professeurService) { }

  classes$: Observable<any> = new Observable()
  professeur$: Observable<any> = new Observable()

  prof: any
  classes: any
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID manquant dans l’URL');
      return;
    }
    this.classes$ = this.classeService.getClassesByProfesseurId(id);
    this.professeur$ = this.ProfesseurService.findById(+id!);

    console.log(this.classes$)
    this.classes$.subscribe(
      {
        next: data => {
          console.log(data)
          this.classes = data.results,
            console.log(this.classes)
        },

        error: err => console.log(err)


      }
    );


    this.professeur$.subscribe(
      {
        next: data => {
          console.log(data)
          this.prof = data.results
          console.log(this.prof)
        }
      }

    );
  }

  voirEmploiDuTemps() {
    const id = this.route.snapshot.paramMap.get('id');

    window.location.href = `http://localhost:4200/professeur/planning/${id}`
  }
}

import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/core/services/etudiant.service';
import { Etudiant } from 'src/app/core/models/etudiant.model';


@Component({
  selector: 'app-etudiants-list',
  templateUrl: './etudiants-list.component.html'
})
export class EtudiantsListComponent implements OnInit {
  etudiants: Etudiant[] = [];
  page = 1;
  total = 0;
  limit = 10;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.etudiantService.getEtudiants(this.page, this.limit).subscribe((res: { data: Etudiant[]; total: number; }) => {
      this.etudiants = res.data;
      this.total = res.total;
    });
  }

  changePage(page: number) {
    this.page = page;
    this.loadEtudiants();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Etudiant } from 'src/app/core/models/etudiant.model';

@Component({
  selector: 'app-etudiant-detail',
  templateUrl: './etudiant-detail.component.html'
})
export class EtudiantDetailComponent implements OnInit {
  etudiant: Etudiant | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.etudiant = this.route.snapshot.data['etudiant'];
  }
}

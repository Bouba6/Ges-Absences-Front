import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EtudiantResponse } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  constructor(private http: HttpClient) {}

  getEtudiants(page: number, limit: number): Observable<EtudiantResponse> {
    // Exemple si tu veux utiliser des données mockées localement
    const etudiantsMock = [
      {
        id: '1',
        nom: 'Sy',
        prenom: 'Modou',
        batiment: 'Informatique',
        niveau: 'L3',
        filiere: 'GL'
      },
      {
        id: '2',
        nom: 'Ndiaye',
        prenom: 'Cheikh',
        batiment: 'Droit',
        niveau: 'L2',
        filiere: 'Droit public'
      }
    ];

    return of({
      data: etudiantsMock,
      total: 2,
      page,
      limit
    });
    
    // Si tu veux utiliser une API réelle plus tard :
    // return this.http.get<EtudiantResponse>(`/api/etudiants?page=${page}&limit=${limit}`);
  }
}

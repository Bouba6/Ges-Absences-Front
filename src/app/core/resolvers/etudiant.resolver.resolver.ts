import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant } from '../models/etudiant.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtudiantResolver implements Resolve<Etudiant | null> {
  constructor(private etudiantService: EtudiantService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Etudiant | null> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.etudiantService.getEtudiantById(id).pipe(
        catchError(error => {
          console.error('Erreur chargement étudiant:', error);
          return of(null); // on retourne null en cas d'erreur
        })
      );
    }
    return of(null);
  }
}

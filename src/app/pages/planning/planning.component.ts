import { Component, OnInit } from '@angular/core';
import { EmploidutempsService } from '../../services/Impl/emploi.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-planning',
  imports: [CommonModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent implements OnInit {
  constructor(private readonly emploiService: EmploidutempsService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  planning$: Observable<any> = new Observable<any>();

  joursSemaine: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  heuresJour: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
  colorMap: { [key: string]: string } = {
    Maths: 'bg-blue-500',
    Physique: 'bg-green-500',
    Informatique: 'bg-yellow-500',
    Anglais: 'bg-red-500'
  };
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const startDate = moment().startOf('week').format('YYYY-MM-DD');
    const endDate = moment().endOf('week').format('YYYY-MM-DD');
    if (!id) {
      console.error('ID manquant dans l’URL');
      return;
    }
    this.planning$ = this.emploiService.getEmploiDuTemps(id, startDate, endDate);
    this.planning$.subscribe(data => console.log(data));
  }

  getCoursParJour(coursList: any[], jour: string, heure: string) {
    return coursList.flatMap(cours => {
      const jourCours = moment(cours.date).format('dddd');
      if (jourCours !== jour) return [];

      const heureDebut = moment(cours.heureDebut, 'HH:mm');
      const heureFin = moment(cours.heureFin, 'HH:mm');
      const duree = heureFin.diff(heureDebut, 'hours');

      // Générer une entrée pour chaque heure du cours
      return Array.from({ length: duree }, (_, index) => ({
        ...cours,
        heure: heureDebut.clone().add(index, 'hours').format('HH:mm')
      }));
    }).filter(cours => cours.heure === heure);
  }

  getCourseColorClass(cours: any): string {
    return this.colorMap[cours.nomCours] || 'bg-red-400';
  }

  getInitials(text: string): string {
    return text
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  ViewClasse(id: number) {

    this.router.navigateByUrl(`/professeur/planningDetails/${id}`);

  }
}


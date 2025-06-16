import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AbscenceApiResponse, AbscenceResponse } from '../../models/Abscence';
import { AbscenceService } from '../../services/Impl/abscence.service';
import { CommonModule } from '@angular/common';
import { JustificatifDetails } from '../../models/Justificatif';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-abscences',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './abscences.component.html',
  styleUrls: ['./abscences.component.css']
})
export class AbscencesComponent {

  totalItems: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 3;

  currentFilter: 'ALL' | 'JUSTIFIER' | 'NON_JUSTIFIER' = 'ALL';


  // États de loading principaux
  isLoading: boolean = false;
  isLoadingJustification: boolean = false;
  isLoadingActions: boolean = false;

  // États de loading spécifiques pour les actions
  isActionValidating: boolean = false;
  isActionRejecting: boolean = false;

  // Données
  abscences: AbscenceResponse[] = [];
  selectedJustificatif?: JustificatifDetails;
  selectedAbsenceId?: string;

  @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

  constructor(private abscenceService: AbscenceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAbscences();
  }

  private loadAbscences(page: number = 0): void {

    this.isLoading = true;
    this.currentPage = page;

    let request: any;

    switch (this.currentFilter) {
      case 'JUSTIFIER':
        request = this.abscenceService.getJustifiedAbscences(page, this.pageSize);
        break;
      case 'NON_JUSTIFIER':
        request = this.abscenceService.getNonJustifiedAbscences(page, this.pageSize);
        break;
      default:
        request = this.abscenceService.selectAll1(page, this.pageSize);
    }

    request.subscribe({
      next: (response: AbscenceApiResponse) => {
        this.abscences = response.results;
        this.totalItems = response.totalItems;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des absences:', error);
        this.isLoading = false;
      }
    });
  }


  setFilter(filter: 'ALL' | 'JUSTIFIER' | 'NON_JUSTIFIER'): void {
    this.currentFilter = filter;
    this.loadAbscences(0); // Retour à la première page
  }

  // Navigation pagination
  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadAbscences(page);
    }
  }

  // Méthodes utilitaires pour la pagination
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }

  // Navigation page précédente/suivante
  previousPage(): void {
    if (!this.isFirstPage) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (!this.isLastPage) {
      this.onPageChange(this.currentPage + 1);
    }
  }















  openJustification(absenceId: string): void {
    // Éviter d'ouvrir si déjà en cours de chargement
    if (this.isLoadingJustification) {
      return;
    }

    this.isLoadingJustification = true;
    this.selectedAbsenceId = absenceId;

    this.abscenceService.getJustificatif(absenceId).subscribe({
      next: (response) => {
        this.selectedJustificatif = response.results;
        console.log(this.selectedJustificatif);
        this.isLoadingJustification = false;
        this.selectedAbsenceId = undefined;
        this.dialog.open(this.popupTemplate, {
          width: '700px',
          height: '500px',
          disableClose: false,
          panelClass: 'custom-dialog-container'
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du justificatif:', error);
        this.isLoadingJustification = false;
        this.selectedAbsenceId = undefined;
        // Vous pouvez ajouter une notification d'erreur ici
      }
    });
  }

  valider(id: string): void {
    if (this.selectedJustificatif && !this.isLoadingActions) {
      this.isLoadingActions = true;
      this.isActionValidating = true;

      this.abscenceService
        .postJustificationValidation(id, {
          statutJustificatif: 'VALIDE'
        })
        .subscribe({
          next: (response) => {
            // Mettre à jour le statut local
            if (this.selectedJustificatif) {
              this.selectedJustificatif.statutJustification = 'VALIDE';
            }

            // Actualiser la liste des absences
            this.loadAbscences();

            this.isLoadingActions = false;
            this.isActionValidating = false;

            // Fermer la modal
            this.dialog.closeAll();

            // Notification de succès
            alert('Justification validée avec succès.');
          },
          error: (error) => {
            console.error('Erreur lors de la validation:', error);
            this.isLoadingActions = false;
            this.isActionValidating = false;
            alert('Erreur lors de la validation de la justification.');
          }
        });
    }
  }

  rejeter(id: string): void {
    if (this.selectedJustificatif && !this.isLoadingActions) {
      this.isLoadingActions = true;
      this.isActionRejecting = true;

      this.abscenceService
        .postJustificationValidation(id, {
          statutJustificatif: 'REJETEE'
        })
        .subscribe({
          next: (response) => {
            // Mettre à jour le statut local
            if (this.selectedJustificatif) {
              this.selectedJustificatif.statutJustification = 'REJETEE';
            }

            // Actualiser la liste des absences
            this.loadAbscences();

            this.isLoadingActions = false;
            this.isActionRejecting = false;

            // Fermer la modal
            this.dialog.closeAll();

            // Notification de succès
            alert('Justification rejetée avec succès.');
          },
          error: (error) => {
            console.error('Erreur lors du rejet:', error);
            this.isLoadingActions = false;
            this.isActionRejecting = false;
            alert('Erreur lors du rejet de la justification.');
          }
        });
    }
  }

  // Méthode pour actualiser manuellement les données
  refresh(): void {
    this.loadAbscences();
  }
}
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { AbscenceResponse } from '../../models/Abscence';
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
  abscences: AbscenceResponse[] = [];
  selectedJustificatif?: JustificatifDetails;

  @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>; // 👈 À ajouter !

  constructor(private abscenceService: AbscenceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.abscenceService.selectAll().subscribe(response => {
      this.abscences = response.results;
    });
  }

  openJustification(absenceId: string) {
    this.abscenceService.getJustificatif(absenceId).subscribe((response) => {
      this.selectedJustificatif = response.results;
      console.log(this.selectedJustificatif);
      this.dialog.open(this.popupTemplate); // ✅ fonctionne maintenant
    });
  }

  valider(id: string) {
    if (this.selectedJustificatif) {
      this.abscenceService
        .postJustificationValidation(id, {
          statutJustificatif: 'VALIDE'
        })
        .subscribe(() => alert('Justification validée.'));
    }
  }

  rejeter(id: string) {
    if (this.selectedJustificatif) {
      this.abscenceService
        .postJustificationValidation(id, {
          statutJustificatif: 'REJETEE'
        })
        .subscribe(() => alert('Justification rejetée.'));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-absence',
  templateUrl: './liste-absence.component.html',
  styleUrls: ['./liste-absence.component.scss']
})
export class ListeAbsenceComponent implements OnInit {

  
  searchTerm: string = '';


  contentHeader: ContentHeader = {
    headerTitle: 'Personnel administratif',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Les absences'
        }
      ]
    }
  };
  absences: any[] = [];

  constructor(private absenceService: UsersService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    this.absenceService.getAllAbsences()
      .subscribe(
        (data: any[]) => {
          this.absences = data;
        },
        error => {
          console.error('Erreur lors du chargement des absences :', error);
        }
      );
  }
  applyFilter(): any[] {
    if (!this.searchTerm) {
      return this.absences;
    }
  
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    return this.absences.filter(absence =>
      (absence.date_debut && absence.date_debut.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (absence.date_fin && absence.date_fin.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (absence.type && absence.type.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (absence.id_absence && absence.id_absence.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (absence.id_eleve && absence.id_eleve.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (absence.id_enseignat && absence.id_enseignat.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (absence.nbre_absence && absence.nbre_absence.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (absence.justificatif && absence.justificatif.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
  deleteAbsence(absenceId: number): void {
    this.absenceService.deleteAbsence(absenceId).subscribe(
      (response) => {
        console.log('absence supprimée avec succès :', response);
        this.toastr.success('Absence supprimée avec succès', 'Succès');
        this.loadAbsences();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réclamation :', error);
        this.toastr.error('Erreur lors de la suppression de la réclamation', 'Erreur');
      }
    );
  }

}

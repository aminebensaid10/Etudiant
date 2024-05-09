import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-mes-absences',
  templateUrl: './mes-absences.component.html',
  styleUrls: ['./mes-absences.component.scss']
})
export class MesAbsencesComponent implements OnInit {
  absences: any[] = []; // Utilisation du type any pour stocker les absences
  searchQuery: string = '';
  absencesFiltrees: any[] = [];
  searchTerm: string = '';


  contentHeader: ContentHeader = {
    headerTitle: 'Eleve',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mes Absences'
        }
      ]
    }
  };
  constructor(private absenceService: UsersService) { }

  ngOnInit(): void {
    this.fetchAbsences(); // Appel à la méthode pour récupérer les absences au chargement du composant
  }
  applyFilter() {
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
  
  fetchAbsences() {
    this.absenceService.getAllAbsences().subscribe(
      (data: any[]) => {
        this.absences = data; // Assignez les données récupérées à la variable absences
      },
      (error) => {
        console.log('Erreur lors de la récupération des absences :', error);
      }
    );
  }
}

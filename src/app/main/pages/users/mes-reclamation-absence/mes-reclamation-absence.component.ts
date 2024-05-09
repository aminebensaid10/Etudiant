import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-mes-reclamation-absence',
  templateUrl: './mes-reclamation-absence.component.html',
  styleUrls: ['./mes-reclamation-absence.component.scss']
})
export class MesReclamationAbsenceComponent implements OnInit {
  searchTerm: string = '';


  contentHeader: ContentHeader = {
    headerTitle: 'Eleve',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mes Reclamation Absences'
        }
      ]
    }
  };
  reclamations: any[] = [];

  constructor(private reclamationService: UsersService) { }

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamationAbsences()
      .subscribe(
        (data: any[]) => {
          this.reclamations = data;
        },
        error => {
          console.error('Erreur lors du chargement des réclamations :', error);
        }
      );
  }
  applyFilter(): any[] {
    if (!this.searchTerm) {
      return this.reclamations;
    }
  
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    return this.reclamations.filter(reclamation =>
      (reclamation.date && reclamation.date.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (reclamation.titre && reclamation.titre.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (reclamation.description && reclamation.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (reclamation.id_Reclamation && reclamation.id_Reclamation.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (reclamation.heure && reclamation.heure.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
  

}

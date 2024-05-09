import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-mes-sanctions',
  templateUrl: './mes-sanctions.component.html',
  styleUrls: ['./mes-sanctions.component.scss']
})
export class MesSanctionsComponent implements OnInit {

  sanctions: any[] = []; // Utilisation du type any pour stocker les absences
  searchQuery: string = '';
  searchTerm: string = '';


  contentHeader: ContentHeader = {
    headerTitle: 'Eleve',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mes Sanction'
        }
      ]
    }
  };
  constructor(private sanctionService: UsersService) { }

  ngOnInit(): void {
    this.fetchsanctions(); // Appel à la méthode pour récupérer les absences au chargement du composant
  }
  fetchsanctions() {
    this.sanctionService.getAllSanction().subscribe(
      (data: any[]) => {
        this.sanctions = data; 
      },
      (error) => {
        console.log('Erreur lors de la récupération des absences :', error);
      }
    );
  }
  applyFilter(): any[] {
    if (!this.searchTerm) {
      return this.sanctions;
    }
  
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    return this.sanctions.filter(sanction =>
      (sanction.Date && sanction.Date.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (sanction.Type && sanction.Type.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (sanction.Id_sanction && sanction.Id_sanction.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (sanction.Id_eleve && sanction.Id_eleve.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (sanction.Id_enseignant && sanction.Id_enseignant.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (sanction.Motif && sanction.Motif.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (sanction.Description && sanction.Description.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
  
  
 

}

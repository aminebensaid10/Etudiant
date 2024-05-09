import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-reclamation',
  templateUrl: './liste-reclamation.component.html',
  styleUrls: ['./liste-reclamation.component.scss']
})
export class ListeReclamationComponent implements OnInit {

  searchTerm: string = '';


  contentHeader: ContentHeader = {
    headerTitle: 'Personnel administratif',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Les reclamations'
        }
      ]
    }
  };
  reclamations: any[] = [];

  constructor(private reclamationService: UsersService, private toastr:ToastrService) { }

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
  deleteReclamation(reclamationId: number): void {
    this.reclamationService.deleteReclamation(reclamationId).subscribe(
      (response) => {
        console.log('Réclamation supprimée avec succès :', response);
        this.toastr.success('Réclamation supprimée avec succès', 'Succès');
        // Actualiser la liste des réclamations après la suppression
        this.loadReclamations();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la réclamation :', error);
        this.toastr.error('Erreur lors de la suppression de la réclamation', 'Erreur');
      }
    );
  }
  
}

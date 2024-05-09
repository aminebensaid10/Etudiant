import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';

@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.scss']
})
export class ListClasseComponent implements OnInit {
  classes: any[] = []; // Utilisation du type any pour stocker les absences
  searchQuery: string = '';
  absencesFiltrees: any[] = [];
  searchTerm: string = '';


  contentHeader: ContentHeader = {
    headerTitle: 'Enseignant',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mes Classes'
        }
      ]
    }
  };
  constructor(private absenceService: UsersService) { }

  ngOnInit(): void {
    this.fetchClasses(); // Appel à la méthode pour récupérer les absences au chargement du composant
  }
  applyFilter() {
    if (!this.searchTerm) {
      return this.classes;
    }
  
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    return this.classes.filter(classe =>
      (classe.nom && classe.nom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (classe.niveau && classe.niveau.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (classe.eleve && classe.eleve.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
  
  
  fetchClasses() {
    this.absenceService.getAllClasse().subscribe(
      (data: any[]) => {
        this.classes = data; // Assignez les données récupérées à la variable absences
      },
      (error) => {
        console.log('Erreur lors de la récupération des absences :', error);
      }
    );
  }
 

}

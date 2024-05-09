import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-reclamation-absence',
  templateUrl: './ajouter-reclamation-absence.component.html',
  styleUrls: ['./ajouter-reclamation-absence.component.scss']
})
export class AjouterReclamationAbsenceComponent  {

  reclamation: any = {
    titre: '',
    date: '',
    description: '',
    heure: ''
  };

  constructor(private reclamationService: UsersService, private toastr: ToastrService) {}

  onSubmit(): void {
    this.reclamationService.addReclamation(this.reclamation)
      .subscribe(
        response => {
          console.log('Réclamation ajoutée avec succès :', response);
          // Afficher une notification de succès
          this.toastr.success('Réclamation ajoutée avec succès', 'Succès');
          // Réinitialiser le formulaire après soumission réussie
          this.reclamation = {
            titre: '',
            date: '',
            description: '',
            heure: ''
          };
        },
        error => {
          console.error('Erreur lors de l\'ajout de la réclamation :', error);
          // Afficher une notification d'erreur
          this.toastr.error('Erreur lors de l\'ajout de la réclamation', 'Erreur');
        }
      );
  }

}

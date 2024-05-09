import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-sanction',
  templateUrl: './ajouter-sanction.component.html',
  styleUrls: ['./ajouter-sanction.component.scss']
})
export class AjouterSanctionComponent  {

  sanction: any = {
    Id_eleve: null,
    Id_enseignant: null,
    Type: '',
    Date: '',
    Motif: '',
    Description: ''
  };

  constructor(private sanctionService: UsersService, private toastr: ToastrService) {}

  onSubmit(): void {
    this.sanctionService.addSanction(this.sanction)
      .subscribe(
        response => {
          console.log('Sanction ajoutée avec succès :', response);
          // Afficher une notification de succès
          this.toastr.success('Sanction ajoutée avec succès', 'Succès');
          // Réinitialiser le formulaire après soumission réussie
          this.sanction = {
            Id_eleve: null,
            Id_enseignant: null,
            Type: '',
            Date: '',
            Motif: '',
            Description: ''
          };
        },
        error => {
          console.error('Erreur lors de l\'ajout de la sanction :', error);
          // Afficher une notification d'erreur
          this.toastr.error('Erreur lors de l\'ajout de l sanction', 'Erreur');
        }
      );
  }

}

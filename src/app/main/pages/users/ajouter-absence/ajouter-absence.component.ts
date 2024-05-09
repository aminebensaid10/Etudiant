import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-absence',
  templateUrl: './ajouter-absence.component.html',
  styleUrls: ['./ajouter-absence.component.scss']
})
export class AjouterAbsenceComponent {

 
  absence: any = {
    Id_eleve: null,
    Id_enseignat: null,
    NomEleve: '',
    PrenomEleve: '',
    Date_debut: '',
    Date_fin: '',
    Type: '',
    Nbre_absence: 0,
    Justificatif: ''
  };

  constructor(private absenceService: UsersService, private toastr: ToastrService) {}

  onSubmit(): void {
    this.absenceService.addAbsence(this.absence)
      .subscribe(
        response => {
          console.log('Absence ajoutée avec succès :', response);
          // Afficher une notification de succès
          this.toastr.success('Absence ajoutée avec succès', 'Succès');
          // Réinitialiser le formulaire après soumission réussie
          this.absence = {
            Id_eleve: null,
            Id_enseignat: null,
            NomEleve: '',
            PrenomEleve: '',
            Date_debut: '',
            Date_fin: '',
            Type: '',
            Nbre_absence: 0,
            Justificatif: ''
          };
        },
        error => {
          console.error('Erreur lors de l\'ajout de l absence :', error);
          // Afficher une notification d'erreur
          this.toastr.error('Erreur lors de l\'ajout de l absence', 'Erreur');
        }
      );
  }

}

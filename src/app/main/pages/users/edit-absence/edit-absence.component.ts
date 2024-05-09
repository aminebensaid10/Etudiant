import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-absence',
  templateUrl: './edit-absence.component.html',
  styleUrls: ['./edit-absence.component.scss']
})
export class EditAbsenceComponent implements OnInit {

 absenceId: number;
  absence: any = {
    id_absence: null,
    id_eleve: null,
    date_debut: '',
    date_fin: '',
    type: '',
    nbre_absence: 0,
    justificatif: ''
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private absenceService: UsersService,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.absenceId = this.route.snapshot.params['id']; // Récupérer l'ID de l'absence depuis l'URL
    this.getAbsence(); // Appeler la méthode pour récupérer l'absence
  }
  
  // Récupérer l'absence par son ID
  getAbsence(): void {
    this.absenceService.getAbsenceById(this.absenceId)
      .subscribe(
        (absence) => {
          this.absence = absence;
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'absence :', error);
        }
      );
  }
  
  updateAbsence(): void {
    this.absenceService.updateAbsence(this.absence)
      .subscribe(
        (response) => {
          console.log('Absence mise à jour avec succès :', response);
          this.toastr.success('Réclamation mise à jour avec succès', 'Succès');
          this.router.navigate(['/liste-absences']); // Rediriger vers la liste des réclamations après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la réclamation :', error);
          this.toastr.error('Erreur lors de la mise à jour de la réclamation', 'Erreur');
        }
      );
  }

}

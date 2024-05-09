import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-reclamation',
  templateUrl: './edit-reclamation.component.html',
  styleUrls: ['./edit-reclamation.component.scss']
})
export class EditReclamationComponent implements OnInit {

  reclamationId: number;
  reclamation: any = {
    id_Reclamation: null,
    titre: '',
    date: '',
    description: '',
    heure: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reclamationService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reclamationId = this.route.snapshot.params['id']; // Récupérer l'ID de la réclamation depuis l'URL
    this.getReclamation(); // Appeler la méthode pour récupérer la réclamation
  }

  // Récupérer la réclamation par son ID
  getReclamation(): void {
    this.reclamationService.getReclamationById(this.reclamationId)
      .subscribe(
        (reclamation) => {
          this.reclamation = reclamation;
        },
        (error) => {
          console.error('Erreur lors de la récupération de la réclamation :', error);
        }
      );
  }

  // Mettre à jour la réclamation
  updateReclamation(): void {
    this.reclamationService.updateReclamation(this.reclamation)
      .subscribe(
        (response) => {
          console.log('Réclamation mise à jour avec succès :', response);
          this.toastr.success('Réclamation mise à jour avec succès', 'Succès');
          this.router.navigate(['/liste-reclamations']); // Rediriger vers la liste des réclamations après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la réclamation :', error);
          this.toastr.error('Erreur lors de la mise à jour de la réclamation', 'Erreur');
        }
      );
  }

}

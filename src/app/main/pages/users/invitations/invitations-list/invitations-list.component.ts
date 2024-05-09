import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { SharedModalsService } from 'app/shared/services/shared-modals.service';
import { ToastrService } from 'ngx-toastr';
import { InvitationCard } from '../../models/invitations-list-model';
import { InvitationsService } from '../services/invitations.service';

@Component({
  selector: 'app-invitations-list',
  templateUrl: './invitations-list.component.html',
  styleUrls: ['./invitations-list.component.scss']
})
export class InvitationsListComponent implements OnInit {

  invitations: InvitationCard[] = [];
  filteredInvitations: InvitationCard[] = [];

  loadingInvitations = true;
  
  contentHeader: ContentHeader = {
    headerTitle: 'Utilisateurs',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Liste des invitations'
        }
      ]
    }
  };
  constructor(private invitationsService: InvitationsService, private toastr: ToastrService, private modalsSerivce: SharedModalsService) { }

  ngOnInit(): void {
    this.getInvitations();
  }

  filter($event) {
    this.filteredInvitations = this.invitations;
    if($event != '') {
      this.filteredInvitations = this.invitations.filter(x => (x.email + x.lastname + ' ' + x.firstname).toLowerCase().includes($event.toLowerCase()));
    }
  }

  getInvitations() {
    this.invitationsService.getInvitations().subscribe(data => {
      this.invitations = data;
      this.filteredInvitations = data;
      this.loadingInvitations = false;
    },
    (error) => {
      this.toastr.error('On n\'a pas pu charger vos invitations', 'Échec');
      this.loadingInvitations = false;
    });
  }

  deleteInvitation(id) {
    this.modalsSerivce.openConfirmationModal('Voulez-vous vraiment supprimer cette invitation?', 'danger', 'Supprimer').then(result => {
      if (result == 'confirmed') {
        this.invitationsService.deleteInvitation(id).subscribe(data => {
          if (data) {
            const indexToRemove = this.invitations.findIndex(x => x._id == id);
            this.invitations.splice(indexToRemove, 1);
            this.toastr.success('Invitation supprimée', 'Succès');
          } else {
            this.toastr.error('Opération échouée', 'Échec');
          }
        });
      }
    });
    
  }

  resendInvitation(user) {
    this.modalsSerivce.openConfirmationModal('Voulez-vous vraiment réenvoyer cette invitation?', 'warning', 'Réenvoyer').then(result => {
      if (result == 'confirmed') {
        this.invitationsService.resendInvitation(user).subscribe(data => {
          this.toastr.success('Email envoyée', 'Succès');
        },
        (error) => {
          this.toastr.error('Opération échouée', 'Échec');
        });
      }
    });
    
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers/auth.guards';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UsersService } from './services/users-service.service';
import { UsersListComponent } from './users-list/users-list.component';
import { MesAbsencesComponent } from './mes-absences/mes-absences.component';
import { CommonModule } from '@angular/common';
import { AjouterReclamationAbsenceComponent } from './ajouter-reclamation-absence/ajouter-reclamation-absence.component';
import { MesReclamationAbsenceComponent } from './mes-reclamation-absence/mes-reclamation-absence.component';
import { MesSanctionsComponent } from './mes-sanctions/mes-sanctions.component';
import { DemanderDocumentComponent } from './demander-document/demander-document.component';
import { ListClasseComponent } from './list-classe/list-classe.component';
import { AjouterAbsenceComponent } from './ajouter-absence/ajouter-absence.component';
import { AjouterSanctionComponent } from './ajouter-sanction/ajouter-sanction.component';
import { ListeReclamationComponent } from './liste-reclamation/liste-reclamation.component';
import { EditReclamationComponent } from './edit-reclamation/edit-reclamation.component';
import { ListeAbsenceComponent } from './liste-absence/liste-absence.component';
import { EditAbsenceComponent } from './edit-absence/edit-absence.component';
import { ParentAbsenceComponent } from './parent-absence/parent-absence.component';
import { ParentSanctionComponent } from './parent-sanction/parent-sanction.component';
import { ParentDemandeDocumentComponent } from './parent-demande-document/parent-demande-document.component';
import { ListDemandeDocumentsComponent } from './list-demande-documents/list-demande-documents.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full'
  },
  {
    path: 'users-list',
    component: UsersListComponent,
  },
  {
    path: 'invitations',
    loadChildren: () => import('./invitations/invitations.module').then(m => m.InvitationsModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'mes-absences',
    component: MesAbsencesComponent,
  },
  {
    path: 'absences-parent',
    component: ParentAbsenceComponent,
  },
  {
    path: 'sanctions-parent',
    component: ParentSanctionComponent,
  },
  {
    path: 'demander-document-parent',
    component: ParentDemandeDocumentComponent,
  },
  {
    path: 'document-administratif',
    component: ListDemandeDocumentsComponent,
  },
  {
    path: 'mes-reclamation-absences',
    component: MesReclamationAbsenceComponent,
  },
  {
    path: 'liste-reclamation',
    component: ListeReclamationComponent,
  },
  {
    path: 'liste-absence',
    component: ListeAbsenceComponent,
  },
  { path: 'edit-reclamation/:id', component: EditReclamationComponent } ,// Route pour l'édition d'une réclamation
  { path: 'edit-absence/:id', component: EditAbsenceComponent } ,// Route pour l'édition d'une réclamation

  {
    path: 'mes-sanction',
    component: MesSanctionsComponent,
  },
  { path: 'faire-reclamation/:idAbsence',
   component: AjouterReclamationAbsenceComponent } ,
   { path: 'ajouter-absence',
   component: AjouterAbsenceComponent } ,
   { path: 'ajouter-sanction',
   component: AjouterSanctionComponent } ,
   { path: 'demander-document',
   component: DemanderDocumentComponent } ,
   { path: 'list-class',
   component: ListClasseComponent } 



]

@NgModule({
  declarations: [
    UsersListComponent,
    MesAbsencesComponent,
    AjouterReclamationAbsenceComponent,
    MesReclamationAbsenceComponent,
    MesSanctionsComponent,
    DemanderDocumentComponent,
    ListClasseComponent,
    AjouterAbsenceComponent,
    AjouterSanctionComponent,
    ListeReclamationComponent,
    EditReclamationComponent,
    ListeAbsenceComponent,
    EditAbsenceComponent,
    ParentAbsenceComponent,
    ParentSanctionComponent,
    ParentDemandeDocumentComponent,
    ListDemandeDocumentsComponent

  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule,
    CommonModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parent-demande-document',
  templateUrl: './parent-demande-document.component.html',
  styleUrls: ['./parent-demande-document.component.scss']
})
export class ParentDemandeDocumentComponent implements OnInit {

  documentForm: FormGroup;
  typesDocuments: string[] = ['Bulletins scolaires et relevés de notes',
  'Rapports d\'évaluation et d\'orientation',
  'Calendrier scolaire',
  'Politiques et règlements de l\'école',
  'Programmes d\'études',
  'Informations sur les enseignants',
  'Comptes rendus de réunions',
  'Documents liés aux besoins spéciaux',
  'Documents administratifs généraux'];

  constructor(private fb: FormBuilder, private documentService: UsersService,  private toastr: ToastrService) {
    this.documentForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateReception: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.documentForm.valid) {
      const documentData: any = {  // Utilisation du type any pour documentData
        titre: this.documentForm.value.titre,
        description: this.documentForm.value.description,
        date_reception: this.documentForm.value.dateReception,
        type: this.documentForm.value.type
      };

      this.documentService.requestDocument(documentData).subscribe(
        response => {
          console.log('Document administratif ajouté avec succès :', response);
          this.toastr.success('Réclamation ajoutée avec succès', 'Succès');

          // Réinitialiser le formulaire après soumission réussie
          this.documentForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'ajout du document administratif :', error);
          this.toastr.error('Erreur lors de l\'ajout de la réclamation', 'Erreur');

        }
      );
    }
  }

 

  get documentFormControl() {
    return this.documentForm.controls;
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demander-document',
  templateUrl: './demander-document.component.html',
  styleUrls: ['./demander-document.component.scss']
})
export class DemanderDocumentComponent implements OnInit {
  documentForm: FormGroup;
  typesDocuments: string[] = ['Billet', 'Contrat', 'Facture', 'Note de service', 'Autre'];

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

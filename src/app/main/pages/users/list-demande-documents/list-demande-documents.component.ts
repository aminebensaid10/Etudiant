import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-demande-documents',
  templateUrl: './list-demande-documents.component.html',
  styleUrls: ['./list-demande-documents.component.scss']
})
export class ListDemandeDocumentsComponent implements OnInit {

  searchTerm: string = '';


  contentHeader: ContentHeader = {
    headerTitle: 'Personnel administratif',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Gérer les demandes des documents administratif'
        }
      ]
    }
  };
  documents: any[] = [];

  constructor(private documentsService: UsersService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    this.documentsService.getAllDemandeDocument()
      .subscribe(
        (data: any[]) => {
          this.documents = data;
        },
        error => {
          console.error('Erreur lors du chargement des demandes :', error);
        }
      );
  }
  applyFilter(): any[] {
    if (!this.searchTerm) {
      return this.documents;
    }
  
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  
    return this.documents.filter(document =>
      (document.date_reception && document.date_reception.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (document.date_modif && document.date_modif.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (document.type && document.type.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (document.id_document && document.id_document.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
      (document.titre && document.titre.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (document.description && document.description.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
 


}

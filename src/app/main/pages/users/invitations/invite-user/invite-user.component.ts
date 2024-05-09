import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UserInscription } from 'app/main/models/users';
import { ToastrService } from 'ngx-toastr';
import French from 'flatpickr/dist/l10n/fr.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { InvitationsService } from '../services/invitations.service';
import { UsersService } from '../../services/users-service.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  @ViewChild('datePicker') datePicker;

  contentHeader: ContentHeader = {
    headerTitle: 'Utilisateurs',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'inviter un utilisateur'}
      ]
    }
  };
  
  userToAdd = new UserInscription();
  inviteUserForm: FormGroup;
  submitted = false;
  emailExist = false;
  loading = false;
  
  dateOptions: FlatpickrOptions = {
    altInput: true,
    altFormat: "F j, Y",
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false,
    hourIncrement: 8,
    locale: French.fr,
    dateFormat: "F j, Y",
  };
  
  
  constructor(private formBuilder: FormBuilder, private invitationsService: InvitationsService,
    private toastr: ToastrService, private usersService: UsersService) { 
  }

  get f() {
    return this.inviteUserForm.controls;
  }

  ngOnInit(): void {
    this.inviteUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birth_date: [],
      phone_number: [''],
      isAdmin: ['']
    });
  }

  resetForm() {
    this.inviteUserForm.reset();
    this.submitted = false;
    this.userToAdd = new UserInscription();
  }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  onSubmit() {
    this.submitted = true;
    this.emailExist = false;
    if (this.inviteUserForm.valid) {
    this.loading = true;
    this.userToAdd.email = this.inviteUserForm.get("email").value;
    this.userToAdd.firstname = this.capitalizeFirstLetter(this.inviteUserForm.get("firstname").value);
    this.userToAdd.lastname = this.capitalizeFirstLetter(this.inviteUserForm.get("lastname").value);
    this.userToAdd.birth_date = this.datePicker.flatpickrElement.nativeElement._flatpickr.latestSelectedDateObj.setHours(12);

    this.userToAdd.phone_number = this.inviteUserForm.get("phone_number").value;
    this.userToAdd.photo = 'user.png';

    this.invitationsService.inviteUser(this.userToAdd).subscribe(data => {
      if (data) {
        //this.resetForm();
        this.toastr.success('Invitation envoyée', 'Succès', {
          positionClass: 'toast-bottom-right',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      } else {
        this.emailExist = true;
      }
      this.loading = false;
    },
    (error) => {
      this.loading = false;
      this.toastr.error('Opération échouée', 'Échec', {
        positionClass: 'toast-bottom-right',
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    });
  }
}

}

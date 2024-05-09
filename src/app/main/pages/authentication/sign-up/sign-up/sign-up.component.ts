import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import French from 'flatpickr/dist/l10n/fr.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { UserInscription } from 'app/main/models/users';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  @ViewChild('datePicker') datePicker;

  userToAdd = new UserInscription();
  submitted = false;

  dateOptions: FlatpickrOptions = {
    altInput: true,
    altFormat: "F j, Y",
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false,
    hourIncrement: 8,
    locale: French.fr,
    dateFormat: "F j, Y",
  };
  

  // submitting data
  loading = false;

  confirmPassword = '';

  // bool if passwords are not valid
  invalidPwd = false;

  // loading pre inscription data
  gettingPreInscription = true;

  // bool if the url is no more valid to finish inscription
  invalidLink = false;

  // the whole image object to be sent in the api
  selectedImage = null;

  // image src to use in html to show preview
  imageSrc = null;

  // birth date ngModel
  birth_date = {
    year: null,
    month: null,
    day: null,
  };

  // error component inputs
  header = "Ce lien n'est plus valide";
  message = "Cette pre-inscription a été annulée par un administrateur ou bien finalisée par l'utilisateur";
  link = "/auth/login";
  btnText = "Connexion";

  constructor(private router: Router, private authServices: AuthenticationService,
    private route: ActivatedRoute, private toastr: ToastrService) {

   }

  ngOnInit(): void {
    this.userToAdd.password = null;
    this.getPreInscription();
  }

  getPreInscription() {
    this.authServices.getPreInscription(this.route.snapshot.params.id).subscribe((data) => {
      if (data) {
        this.userToAdd = data;
      } else {
        this.router.navigate(['/miscellaneous',
        this.header,
        this.message,
        this.link,
        this.btnText,
      
      ]);
      }
      this.gettingPreInscription = false;
    },
    (error) => {
      this.router.navigate(['/miscellaneous',
        this.header,
        this.message,
        this.link,
        this.btnText
      ]);
      this.gettingPreInscription = false;
    });
  }

  resetImage() {
    this.selectedImage = null;
    this.imageSrc = null;
  }

  onPwdChange() {
    if (this.userToAdd.password.length < 6 || this.confirmPassword != this.userToAdd.password || this.userToAdd.password == '') {
      this.invalidPwd = true;
    } else {
      this.invalidPwd = false;
    }
  }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

  signUp(f: NgForm) {
    this.submitted = true;
    this.onPwdChange();
    if (f.valid && this.confirmPassword == this.userToAdd.password && !this.invalidPwd) {

      this.userToAdd.birth_date = this.datePicker.flatpickrElement.nativeElement._flatpickr.latestSelectedDateObj.setHours(12);

      if (this.selectedImage != null) {
        this.userToAdd.photo = this.userToAdd._id + '.' + this.selectedImage.name.split('.').at(-1);
      } else {
        this.userToAdd.photo = 'user.png';
      }

      this.userToAdd.firstname = this.capitalizeFirstLetter(this.userToAdd.firstname);
      this.userToAdd.lastname = this.capitalizeFirstLetter(this.userToAdd.lastname);
      this.loading = true;
      this.authServices.signUp(this.userToAdd).subscribe(data => {
        if (data) {
          this.router.navigate(['/auth/login']);
          this.authServices.uploadImage(this.selectedImage, this.userToAdd._id).subscribe(data => {
            this.loading = false;
            // image uploaded
          },
          (error) => {
            this.loading = false;
            this.toastr.error('Photo de profile n\'a pas été enregistrée', 'Échec', {
              positionClass: 'toast-bottom-right',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
          });
          this.toastr.success('Inscription éffectuée', 'Succès', {
            positionClass: 'toast-bottom-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
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

  onFileSelected($event) {
    if ($event.target.files && $event.target.files[0]) {
      const imageType = ['image/png', 'image/jpeg', 'image/jpg'];
      const file = $event.target.files[0];
      if (!imageType.includes(file.type)) {
        this.selectedImage = null;
        this.imageSrc = null;
      } else {
        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;
  
        reader.readAsDataURL(file);
      }
  }
  }

}

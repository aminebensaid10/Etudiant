import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { CoreMenu } from '@core/types';
import { CurrentUser, UserInscription } from 'app/main/models/users';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public currentUser: Observable<CurrentUser>;

  currentUserSubject: BehaviorSubject<CurrentUser>;

  private menu: CoreMenu[] = [
    // {
    //   id: 'users',
    //   title: 'Utilisateurs',
    //   type: 'collapsible',
    //   icon: 'users',
    //   children: [
    //     {
    //       id: 'users-list',
    //       icon: 'circle',
    //       title: 'Liste des utilisateurs',
    //       type: 'item',
    //       url: 'users/users-list'
    //     },
    //     {
    //       id: 'invitation-user',
    //       icon: 'circle',
    //       title: 'Liste des invitations',
    //       type: 'item',
    //       url: 'users/invitations/invitations-list'
    //     },
    //     {
    //       id: 'add-user',
    //       icon: 'circle',
    //       title: 'Inviter un utilisateur',
    //       type: 'item',
    //       url: 'users/invitations/invite-user'
    //     },
    //   ],
    // },
    {
      id: 'users',
      title: 'Eleve',
      type: 'collapsible',
      icon: 'users',
      children: [
        {
          id: 'absences',
          icon: 'circle',
          title: 'Mes abscense',
          type: 'item',
          url: 'users/mes-absences'
        },
        {
          id: 'sanctions',
          icon: 'circle',
          title: 'Mes sanctions',
          type: 'item',
          url: 'users/mes-sanction'
        },
        {
          id: 'reclamations',
          icon: 'circle',
          title: 'Mes reclamations',
          type: 'item',
          url: 'users/mes-reclamation-absences'
        },
        {
          id: 'reclamations',
          icon: 'circle',
          title: 'Demander documents',
          type: 'item',
          url: 'users/demander-document'
        },
      ],
    },
    {
      id: 'userss',
      title: 'Enseignant',
      type: 'collapsible',
      icon: 'users',
      children: [
        {
          id: 'Classe',
          icon: 'circle',
          title: 'Mes classe',
          type: 'item',
          url: 'users/list-class'
        },
        
      ],
    },
    {
      id: 'usersss',
      title: 'Personnel administratif',
      type: 'collapsible',
      icon: 'users',
      children: [
        {
          id: 'Absence',
          icon: 'circle',
          title: 'Gérer les absences',
          type: 'item',
          url: 'users/liste-absence'
        },
        {
          id: 'Reclamation',
          icon: 'circle',
          title: 'Gérer les reclamation',
          type: 'item',
          url: 'users/liste-reclamation'
        },
        
      ],
    },
    {
      id: 'usersss',
      title: 'Parent',
      type: 'collapsible',
      icon: 'users',
      children: [
        {
          id: 'Absence-parent',
          icon: 'circle',
          title: 'Voir les absences',
          type: 'item',
          url: 'users/absences-parent'
        },
        {
          id: 'Sanction-parent',
          icon: 'circle',
          title: 'Voir les sanctions',
          type: 'item',
          url: 'users/sanctions-parent'
        },
        {
          id: 'demandedocument',
          icon: 'circle',
          title: 'Demander un document',
          type: 'item',
          url: 'users/demander-document-parent'
        },
        
      ],
    }
  ]
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }


  public get currentMenu(): CoreMenu[] {
    this.menu.forEach(x => {
      // if (this.currentUserValue.access_rights[x.id] != 'none') {
      //   x.hidden = false;
      // } else {
      //   x.hidden = true;
      // }
      x.hidden = false;
    });
    return this.menu;
  }


  login(email: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/api/auth/login', { email, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            // notify
            this.currentUserSubject.next(user);
            return user;
          }

          return user;
        })
      );
  }

  // get pre-inscription to prefill the register form
  getPreInscription(id) {
    return this.http.get<UserInscription>(environment.apiUrl + '/api/auth/getPreInscription?id=' + id).pipe(
      map(data => {
        if (data) {
          data.password = '';
          return data;
        }
        return null;
      })
    );
  }

  // sign up user after inviting him
  signUp(user) {
    return this.http.put<boolean>(environment.apiUrl + '/api/auth/signUp', user);
  }


  // upload profile picture
  uploadImage(file: File, user_id) {
    const formData: FormData = new FormData();
    formData.append('userToAdd', JSON.stringify(user_id));
    formData.append('file', file);
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/uploadProfileImage`, formData);
    return this.http.request(req);
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    this.router.navigate(["/auth/login"]);
    // notify
    this.currentUserSubject.next(null);
  }
}

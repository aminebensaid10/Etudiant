import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInscription } from 'app/main/models/users';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { InvitationCard } from '../../models/invitations-list-model';

@Injectable()
export class InvitationsService {

  constructor(private http: HttpClient) { }

  // get pending invitations
  getInvitations() {
    const colors = ['success', 'primary', 'warning', 'danger', 'secondary', 'dark'];
    return this.http.get<InvitationCard[]>(environment.apiUrl + '/api/invitations/getInvitations').pipe(
      map(data => {
        data = data.map(x => {
          const randomIndex = Math.floor(Math.random() * 6);
          x.color = colors[randomIndex];
          x.shortName = (x.lastname.substring(0,1) + x.firstname.substring(0,1)).toUpperCase();
          return x;
        });
        return data;
      })
    );
  }

  // resend invitation email
  resendInvitation(user: InvitationCard) {
    return this.http.post(environment.apiUrl + '/api/invitations/resendInvitation', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      _id: user._id
    });
  }

  
  deleteInvitation(id) {
    return this.http.delete<boolean>(environment.apiUrl + '/api/invitations/cancelInvitation?id=' + id);
  }
  
  // send user invitation
  inviteUser(user) {
    return this.http.post<UserInscription>(environment.apiUrl + '/api/invitations/inviteUser', user);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInscription } from 'app/main/models/users';
import { environment } from 'environments/environment';
import { ChangeEmailRequest } from '../models/change-email-request';
import { UserCard } from '../models/users-list';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  private apiUrl = 'http://localhost:8080/Absence/allAbsence';
  constructor(private http: HttpClient) { }

  // get all users on the plateform
  getUsers() {
    return this.http.get<any[]>(environment.apiUrl + '/api/users/getUsers');
  }
  getAllAbsences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getAllSanction(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/Sanction/all');
  }
 
  requestDocument(document: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/DocumentAdministratif/addDocumentAdministratif'; // URL de votre API backend
    return this.http.post<any>(apiUrl, document);
  }
  
  getAllReclamationAbsences(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/Reclamation/all');
  }
  getAllReclamation(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/Reclamation/all');
  }
  getAllClasse(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/Classe/allClasse');
  }
  deleteReclamation(reclamationId: number): Observable<any> {
    const apiUrl = 'http://localhost:8080/Reclamation/delete'; // URL de votre API
    const url = `${apiUrl}/${reclamationId}`;
    return this.http.delete(url);
  }
  deleteAbsence(absenceId: number): Observable<any> {
    const apiUrl = 'http://localhost:8080/Absence/deleteAbsence'; // URL de votre API
    const url = `${apiUrl}/${absenceId}`;
    return this.http.delete(url);
  }
  
  getReclamationById(reclamationId: number): Observable<any> {
    const url = `http://localhost:8080/Reclamation/find/${reclamationId}`;
    return this.http.get<any>(url);
  }
  getAbsenceById(absenceId: number): Observable<any> {
    const url = `http://localhost:8080/Absence/findAbsence/${absenceId}`;
    return this.http.get<any>(url);
  }

  // Mettre à jour une réclamation existante
  updateReclamation(reclamation: any): Observable<any> {
    const url = `http://localhost:8080/Reclamation/update/${reclamation.id_Reclamation}`;
    return this.http.put(url, reclamation);
  }
  updateAbsence(absence: any): Observable<any> {
    const url = `http://localhost:8080/Absence/updateAbsence/${absence.id_Absence}`;
    return this.http.put(url, absence);
  }
  getAllDemandeDocument(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/DocumentAdministratif/allDocumentAdministratif');
  }
  
  addReclamation(reclamation: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/Reclamation/add'; // URL de votre API backend
    return this.http.post<any>(apiUrl, reclamation);
  }
  addAbsence(absence: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/Absence/addAbsence'; // URL de votre API backend
    return this.http.post<any>(apiUrl, absence);
  };
  addSanction(absence: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/Sanction/add'; // URL de votre API backend
    return this.http.post<any>(apiUrl, absence);
  }

  // get user data (for user profile)
  getUserData(id) {
    return this.http.get<UserInscription>(environment.apiUrl + '/api/users/getUserData?id=' + id);
  }

  // update all user data except for password and access rights
  updateUserData(user) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/updateUserData', user);
  }


  changePwd(user_id, oldPassword, newPassword,) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/changePassword', {user_id, oldPassword, newPassword});
  }


  // save access rights changes
  updateAccessRights(user_id, access_rights) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/updateAccessRights', {user_id, access_rights});
  }
 

  // change account status (active/inactive)
  toggleAccountStatus(user_id, new_status) {
    return this.http.put<boolean>(environment.apiUrl + '/api/users/toggleAccountStatus', {user_id, new_status});
  }

  // send a verification code the new email typed by the user
  // returns false if the email is already used
  // return the document _id if the code has been sent
  sendChangeEmailRequest(request: ChangeEmailRequest) {
    return this.http.post(environment.apiUrl + '/api/users/sendChangeEmailRequest', request);
  }

  // takes the document _id and the verification code as params
  // verifes if the verification code is valid or not. and based on that if the verification code is true it updates the email
  updateEmail(id, verification_code) {
    return this.http.put(environment.apiUrl + '/api/users/updateEmail', {id, verification_code});
  }
}









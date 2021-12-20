import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: User;
  constructor(private tokenStorage: TokenStorageService) {
  }

  public setUser(user: User) {
    this.user = new User();
    if (user && user.id){
      this.user.id = user['id'];
      this.user.username = user['username'];
      this.user.email = user['email'];
      this.user.roles = user['roles'];
    }
  }

  public getUser(): User {
   return this.user;
  }

  public isModerator() {
    let is_mod: boolean = false;
    this.user.roles.forEach(role => {
      if (role == 'ROLE_MODERATOR') {
        is_mod = true;
      }
    });
    return is_mod;
  }

  public isAdmin() {
    let is_adm: boolean = false;
    this.user.roles.forEach(role => {
      if (role == 'ROLE_ADMIN') {
        is_adm = true;
      }
    });
    return is_adm;
  }

  // url = this.globalVars.getBaseURL() + '/api/test/';

  // getPublicContent(): Observable<any> {
  //   return this.http.get(this.url + 'all', {responseType: 'text'});
  //  }

  // getUserBoard(): Observable<any> {
  //   return this.http.get(this.url + 'user', {responseType: 'text'});
  // }

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(this.url + 'mod', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(this.url + 'admin', { responseType: 'text' });
  // }

}

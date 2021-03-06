import { Injectable } from '@angular/core';
import { User } from 'src/models/user';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: User = new User();
  
  constructor() {
  }

  public setUser(user: User) {
    this.user = new User();
    if (user && user.id) {
      this.user.id = user['id'];
      this.user.username = user['username'];
      this.user.email = user['email'];
      console.log("user-roles:" + user['roles']);
      this.user.roles = user['roles']?user['roles']:['user'];
    }
  }

  public getUser(): User {
    return this.user;
  }

  hasRole(role: string) {
    return this.user?.roles.includes(role);
  }

  public setMode(mode: string) {
    this.user.mode = mode;
  }

}

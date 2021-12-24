import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../providers/dialog.service';
import { TokenStorageService } from '../providers/token-storage.service';
import { UserService } from '../providers/user.service';

@Component({
  selector: 'lower-menu',
  templateUrl: './lower-menu.component.html',
  styleUrls: ['./lower-menu.component.scss']
})
export class LowerMenuComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private dialogService: DialogService,
              private router: Router) { }

  ngOnInit(): void {
  }

  displayLogin(){
    this.dialogService.displayLogin();
  }

  isLoggedIn(){
    return !!this.tokenStorageService.getToken();
  }
  
  logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['gis']).then(() => this.userService.setUser(null));
  }

  username(){
    return this.userService.getUser()?.username;
  }

  hasRole(role: string){
    return this.userService.hasRole(role);
  }
  
  isAdmin(){
    return this.hasRole('ROLE_ADMIN');
  }

  isModerator(){
    return this.hasRole('ROLE_MODERATOR');
  }

  mode(){
    return this.userService.getUser().mode;
  }

  modeGis(){
    this.router.navigate(['gis']).then(() => this.userService.setMode('gis'));
  }

  modeImovina(){
    this.router.navigate(['imovina']).then(() => this.userService.setMode('imovina'));
  }

  modeAdministracija(){
    this.router.navigate(['administracija']).then(() => this.userService.setMode('administracija'));
  }


}

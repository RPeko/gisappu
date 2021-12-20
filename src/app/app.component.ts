import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { TokenStorageService } from './providers/token-storage.service';
import { UserService } from './providers/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  roles: string[] = [];
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (!!this.tokenStorageService.getToken()) {
      // console.log("User: " + JSON.stringify(user));
      this.userService.setUser(this.tokenStorageService.getUser());
    } else {
      console.log("Not logged in!");
    }
 
  }

  
}

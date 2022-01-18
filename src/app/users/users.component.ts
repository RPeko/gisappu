import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from '../providers/auth.service';
import { DialogService } from '../providers/dialog.service';
import { EventEmitterService } from '../providers/event-emitter.service';
import { UsersService } from '../providers/users.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users: User[];
displayedColumns: string[] = ['username','email','delete','edit'];


  constructor(private usersService: UsersService, 
              private authService: AuthService,
              private dialogService: DialogService) { }


  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(lista => this.users = lista);
  }

  deleteUser(user:User){
    this.authService.delete(user.id).subscribe(data => {
      console.log(data.message);
      this.users = this.users.filter((u:User) => u.id != user.id);
    },
    err => {
    console.log(err);
      });
  }

  editUser(user:User){
    console.log("poslato: " + JSON.stringify(this.users));
    this.dialogService.displayRegistration(user);
  }

  addUser(){ 
   this.dialogService.displayRegistration(new User());
  }
}
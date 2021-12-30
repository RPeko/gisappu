import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from '../providers/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
users: User[];

  constructor(private usersService: UsersService) { }


  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe(lista => this.users = lista);
  }

}

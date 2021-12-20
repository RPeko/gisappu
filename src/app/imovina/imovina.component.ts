import { Component, OnInit } from '@angular/core';
import { UserService } from '../providers/user.service';

@Component({
  selector: 'app-imovina',
  templateUrl: './imovina.component.html',
  styleUrls: ['./imovina.component.scss']
})
export class ImovinaComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  isAdmin(){
    return this.userService.isAdmin();
  }

}

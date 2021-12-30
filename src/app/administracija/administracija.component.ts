import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'administracija',
  templateUrl: './administracija.component.html',
  styleUrls: ['./administracija.component.scss']
})

export class AdministracijaComponent implements OnInit {
  mode = 'users';

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.mode);
  }

  changeMode(m: string){
    this.mode = m;
    console.log(this.mode);
  }
  
  is_users(){
    return this.mode == 'users';
  }

}

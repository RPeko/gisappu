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
  }

  changeMode(){
    console.log("mode: " + this.mode);
  }

}

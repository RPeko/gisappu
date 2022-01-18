import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';
import { EventEmitterService } from '../providers/event-emitter.service';

@Component({
  selector: 'administracija',
  templateUrl: './administracija.component.html',
  styleUrls: ['./administracija.component.scss']
})

export class AdministracijaComponent implements OnInit {

  constructor(private eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Detalj } from 'src/models/detalj';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss']
})
export class DialogDetailsComponent implements OnInit {
  detalji: Detalj[];
  displayedColumns = ['stavka', 'opis'];

  constructor(public dialogRef: MatDialogRef<DialogDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Detalj[]) {
    try {
      // console.log(data);
      this.detalji = data;
    } catch (e) {
      console.log('Ovde je greska')
    }
  }
  ngOnInit() {
    
  }

}

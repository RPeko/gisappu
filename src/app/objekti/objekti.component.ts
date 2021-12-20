import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Objekat, ObjekatSchema } from 'src/models/objekat';
import { ObjekatService } from '../providers/objekat.service';

@Component({
  selector: 'app-objekti',
  templateUrl: './objekti.component.html',
  styleUrls: ['./objekti.component.scss']
})
export class ObjektiComponent implements OnInit {
  objekti: Objekat[];
  displayedColumns: string[] = Object.keys(ObjekatSchema);
  dataSchema = ObjekatSchema;
  dataSource = new MatTableDataSource<Objekat>();

 
  constructor(
    private objekatService: ObjekatService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.objekatService.getListaObjekata().subscribe(
      lista => this.dataSource.data = lista);
  }

  editRow(row) {
    if (row.id === 0) {
      this.objekatService.addObjekat(row).subscribe(res => {
        row.id = res.id;
        row.isEdit = false;
      });
    } else {
      this.objekatService.updateObjekat(row).subscribe(() => row.isEdit = false);
    }
  }

  addRow() {
    const newRow: Objekat = {id: 0, ko: 7, kultura: "", geom: null,
                            vrstaPrava: "", brParcele: "", povrsina: 0, brojimen: "", 
                            isEdit: true, isSelected: false}
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    this.objekatService.deleteObjekat(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Objekat) => o.id !== id);
    });
  }

  removeSelectedRows() {
    const objekti= this.dataSource.data.filter((o: Objekat) => o.isSelected);
    // this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirm => {
    //   if (confirm) {
        this.objekatService.deleteObjekti(objekti).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((o: Objekat) => !o.isSelected);
        });
    //   }
    // });
  }
}
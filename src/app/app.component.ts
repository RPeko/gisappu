import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { KO } from 'src/models/ko';
import { MenuLayer } from 'src/models/menu_layer';
import { Layer } from 'src/models/layer';
import { Kategorija } from 'src/models/kategorija';
import { EventEmitterService } from 'src/app/providers/event-emitter.service';
import { KategorijaService } from 'src/app/providers/kategorija.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogService } from 'src/app/providers/dialog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'GIS Vrbas';
  menuLayers: MenuLayer[] = [];
  listaKat: Kategorija[] = [];
  currentKO = ' (Vrbas-grad)';
  poruka1 = '';
  poruka2 = '';
  ucitaneRGZAdrese = false;

  listaKO: KO[] = [
    { idKO: 7, sifraKO: '013', nazivKO: 'Vrbas', rBrKO: 1, centarx: 45.57185, centary: 19.640113, zoom: 14 },
    { idKO: 1, sifraKO: '003', nazivKO: 'Bačko Dobro Polje', rBrKO: 3, centarx: 45.500382, centary: 19.68927, zoom: 15 },
    { idKO: 8, sifraKO: '025', nazivKO: 'Zmajevo', rBrKO: 4, centarx: 45.452394, centary: 19.688595, zoom: 15 },
    { idKO: 4, sifraKO: '016', nazivKO: 'Ravno Selo', rBrKO: 5, centarx: 45.447693, centary: 19.62254, zoom: 15 },
    { idKO: 3, sifraKO: '007', nazivKO: 'Kucura', rBrKO: 6, centarx: 45.520522, centary: 19.589556, zoom: 15 },
    { idKO: 5, sifraKO: '012', nazivKO: 'Savino Selo', rBrKO: 7, centarx: 45.506154, centary: 19.522938, zoom: 15 },
   ];


  constructor(
    public storageMap: StorageMap,
    public eventEmitter: EventEmitterService,
    private kategorijaService: KategorijaService,
    private ngxService: NgxUiLoaderService,
    private dialogService: DialogService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.storageMap.get('KO').subscribe((katOpst: KO) => {
      if (katOpst) {
        this.eventEmitter.KOChange.emit(katOpst);
        this.currentKO = ' (' + katOpst.nazivKO + ')';
      }
      this.storageMap.get('mnLayers').subscribe((ls: MenuLayer[]) => {
        if (ls) {
          this.menuLayers = ls;
          // console.log('menuLayers: ' + JSON.stringify(this.menuLayers.length));
        } else {
          this.storageMap.delete('mnLayers').subscribe();
        }
        // console.log('okida');
        this.getListaKat();
      });
    });
  }

  getListaKat() {
    this.kategorijaService.getKategorije()
      .subscribe(lista => {
        //  console.log(JSON.stringify(lista));
        this.listaKat = [];
        lista.filter(kat => kat.nadkateg === 0)
          .forEach(item => this.listaKat.push(item));
        this.listaKat.forEach(kat => kat.subkat = []);
        lista.filter(kat => kat.nadkateg !== 0)
          .forEach(subkat => this.listaKat.find(kat => kat.id === subkat.nadkateg).subkat.push(subkat));
        this.checkFromStorage();
      },
        error => console.log('Nema konekcije!  ' + error)
        );
  }

  promeniKO(katOpst: KO) {
    this.storageMap.set('KO', katOpst).subscribe();
    this.eventEmitter.KOChange.emit(katOpst);
    this.currentKO = ' (' + katOpst.nazivKO + ')';
    this.menuLayers.forEach(cl => {
      const layer = this.getLayer(cl.id);
      if (cl.checked && layer.pojedinacnaKO) {
        this.reloadLayer(layer);
      }
    });
  }

  getLayer(id: number) {
    let layer: Layer;
    this.listaKat.forEach(kat => {
      if (kat.layers.findIndex(l => l.id === id) > -1) {
        layer = kat.layers.find(l => l.id === id);
        console.log(JSON.stringify(layer));
      } else {
        kat.subkat.forEach(extSubkat => {
          if (extSubkat.layers.findIndex(l => l.id === id) > -1) {
            layer = extSubkat.layers.find(l => l.id === id);
          }
        });
      }
    });
    return layer;
  }


  checkFromStorage() {
    this.listaKat.forEach(kat => kat.subkat.forEach(subkat => this.checkFromStorageSubkat(subkat)));
    this.listaKat.forEach(kat => this.checkFromStorageKat(kat));
  }

  checkFromStorageSubkat(subkat: Kategorija) {
    subkat.collapsed = true;
    subkat.layers.forEach(l => {
      const cl = this.menuLayers.find((mlayer: MenuLayer) => mlayer.id === l.id);
      if (cl) {
        l.checked = cl.checked;
        if (l.checked) {
          subkat.collapsed = false;
        }
      } else {
        l.checked = false;
        this.menuLayers.push({ id: l.id, checked: false });
      }
      if (l.checked) {
        if (l.id === 4) {
          this.ngxService.startLoader('rasveta');
        } else {
          this.ngxService.start();
        }
      }
      this.eventEmitter.layerSwitch.emit(l);
    });
  }

  checkFromStorageKat(kat: Kategorija) {
    kat.collapsed = true;
    kat.layers.forEach(l => {
      const cl = this.menuLayers.find((mlayer: MenuLayer) => mlayer.id === l.id);
      if (cl) {
        l.checked = cl.checked;
        if (l.checked) {
          kat.collapsed = false;
        }
      } else {
        l.checked = false;
        this.menuLayers.push({ id: l.id, checked: false });
      }
      if (l.checked) {
        if (l.id === 4) {
          this.ngxService.startLoader('rasveta');
        } else {
          this.ngxService.start();
        }
      }
      this.eventEmitter.layerSwitch.emit(l);
    });
    kat.subkat.forEach(subkat => {
      if (!subkat.collapsed) {
        kat.collapsed = false;
      }
    });
  }

  toggleCollapsed(kat: Kategorija) {
    if (kat.collapsed) {
      kat.collapsed = false;
    } else {
      kat.collapsed = true;
    }
  }

  reloadLayer(layer: Layer) {
    layer.checked = false;
    this.eventEmitter.layerSwitch.emit(layer);
    layer.checked = true;
    this.eventEmitter.layerSwitch.emit(layer);
  }

  clickLayer(layer: Layer, preserveFitToBounds?: boolean) {
    // console.log("layer: " + JSON.stringify(layer));
    if (layer.id === 4) {
      this.ngxService.startLoader('rasveta');
    } else {
      this.ngxService.start();
    }
    layer.checked = !layer.checked;
    if (layer.checked === false && layer.filteri) {
      layer.filteri.forEach(f => f.searchstring = '');
    }
    if (preserveFitToBounds) {
      layer.preserveFitToBounds = true;
    } else {
      layer.preserveFitToBounds = false;
    }
    // console.log('layer.checked:  ' + layer.checked);
    if (!this.menuLayers) {
      this.removeAllLayers();
    }
    const ml = this.menuLayers.find((mlayer: MenuLayer) => mlayer.id === layer.id);
    // console.log(JSON.stringify(cl));
    if (ml) {
      ml.checked = layer.checked;
    }
    this.eventEmitter.layerSwitch.emit(layer);
    this.storageMap.set('mnLayers', this.menuLayers).subscribe();
    // console.log("menuLAyers: " + localStorage.getItem("mnLayers"));
  }

  checkAll(kat: Kategorija) {
    const listUnchecked = kat.layers.filter(l => l.checked === false);
    switch (listUnchecked.length) {
      case 0:
        kat.layers.forEach(l => {
          this.clickLayer(l);
        });
        break;
      case 1:
        listUnchecked.forEach(l => {
          this.clickLayer(l);  // if exist one uncheck, fit to bounds
        });
        break;
      default:
        listUnchecked.forEach(l => {
          this.clickLayer(l, true);  // if exist more than one, not fit to bounds
        });
    }
  }

  removeAllLayers() {
    this.eventEmitter.rgzAdreseSwitch.emit(true);
    this.ucitaneRGZAdrese = false;
    this.menuLayers.forEach(ml => ml.checked = false);
    this.storageMap.set('mnLayers', this.menuLayers).subscribe();
    this.listaKat.forEach(kat => kat.layers.forEach(l => l.filteri.forEach(f => f.searchstring = '')));
    this.listaKat.forEach(kat => kat.subkat.forEach(sk => sk.layers.forEach(l => l.filteri.forEach(f => f.searchstring = ''))));
    this.checkFromStorage();
  }

  changeLayerPreview(ev, layer: Layer) {
    const x = +ev.clientX;
    const y = +ev.clientY;
    this.dialogService.displayLayerPreview({ layer, x, y });
  }

  displayLegend(l: Layer) {
    this.dialogService.displayLegend(l);
  }

  toggleRGZAdrese(){
    this.eventEmitter.rgzAdreseSwitch.emit(this.ucitaneRGZAdrese);
  }

}

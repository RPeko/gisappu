import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { EventEmitterService } from 'src/app/providers/event-emitter.service';
import { KOService } from 'src/app/providers/ko.service';
import { TackeService } from 'src/app/providers/tacke.service';
import { PoligoniService } from 'src/app/providers/poligoni.service';
import { LinijeService } from 'src/app/providers/linije.service';
import { MLinijeService } from 'src/app/providers/mlinije.service';
import { RasvetaService } from 'src/app/providers/rasveta.service';
import { KategorijaService } from 'src/app/providers/kategorija.service';
import { GlobalVars } from 'src/app/providers/globalVars';

import { NgxUiLoaderModule, NgxUiLoaderConfig} from 'ngx-ui-loader';
import { DialogLegendComponent } from './dialog-legend/dialog-legend.component';
import { DialogDetailsComponent } from './dialog-details/dialog-details.component';
import { AngularMaterialModule } from './angular-material.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { DialogLayerPreviewComponent } from './dialog-layer-preview/dialog-layer-preview.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { DetaljiService } from './providers/detalji.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ObjektiComponent } from './objekti/objekti.component';
import { ObjekatService } from './providers/objekat.service';
import { ImovinaComponent } from './imovina/imovina.component';
import { GisComponent } from './gis/gis.component';
import { UsersComponent } from './users/users.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'green',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin',
  blur: 5,
  delay: 0.2,
  fgsColor: '#17a11e',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'folding-cube',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  // "logoUrl": "assets/imgs/logo.png",
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: 'green',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: 'Molimo sačekajte...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: 10000,
  minTime: 0
};

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    DialogLegendComponent,
    DialogDetailsComponent,
    DialogLayerPreviewComponent,
    LoginComponent,
    RegisterComponent,
    ObjektiComponent,
    ImovinaComponent,
    GisComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    ColorPickerModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatDialogModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)],
    entryComponents: [DialogLegendComponent, DialogDetailsComponent, DialogLayerPreviewComponent],
  providers: [
    EventEmitterService,
    KOService,
    TackeService,
    PoligoniService,
    LinijeService,
    MLinijeService,
    RasvetaService,
    KategorijaService,
    GlobalVars,
    AuthInterceptor,
    DetaljiService,
    ObjekatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracijaComponent } from './administracija/administracija.component';
import { GisComponent } from './gis/gis.component';
import { ImovinaComponent } from './imovina/imovina.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: GisComponent },
  { path: 'gis', component: GisComponent },
  { path: 'imovina', component: ImovinaComponent },
  { path: 'administracija', component: AdministracijaComponent },
  { path: 'registracija', component: RegisterComponent, outlet: 'administracija' },
  {path:'login', component: LoginComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

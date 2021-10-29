import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  { path: '', component: MapaComponent },
  // { path: '', redirectTo: '/mapa', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
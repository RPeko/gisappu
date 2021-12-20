import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GisComponent } from './gis/gis.component';
import { ImovinaComponent } from './imovina/imovina.component';
import { LoginComponent } from './login/login.component';
import { ObjektiComponent } from './objekti/objekti.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: GisComponent },
  { path: 'gis', component: GisComponent },
  { path: 'imovina', component: ImovinaComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ObjektiComponent, outlet: 'imovina' },
  {path:'login', component: LoginComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

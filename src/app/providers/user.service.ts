import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVars } from './globalVars';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private globalVars: GlobalVars) {
  }

  url = this.globalVars.getBaseURL() + '/api/test/';

  getPublicContent(): Observable<any> {
    return this.http.get(this.url + 'all', {responseType: 'text'});
   }

  getUserBoard(): Observable<any> {
    return this.http.get(this.url + 'user', {responseType: 'text'});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.url + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.url + 'admin', { responseType: 'text' });
  }

}

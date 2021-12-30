import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVars } from './globalVars';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private globalVars: GlobalVars) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.globalVars.getBaseURL() + '/auth/signin', { username, password }, httpOptions);
  }

  register(username: string, email: string, password: string, roles: string[]): Observable<any>{
    return this.http.post(this.globalVars.getBaseURL() + '/auth/signup', {username, email, password, roles }, httpOptions);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { GlobalVars } from './globalVars';


@Injectable({
  providedIn: 'root'
})

export class UsersService {;
  constructor(private globalVars: GlobalVars, private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            // tslint:disable-next-line:object-literal-key-quotes
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        };
    return this.http.get<User[]>(this.globalVars.baseURL + '/api/users/',  httpOptions);
}


}

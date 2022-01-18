import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';
import { AuthService } from './auth.service';
import { GlobalVars } from './globalVars';


@Injectable({
  providedIn: 'root'
})

export class UsersService {;
  constructor(private globalVars: GlobalVars, 
              private http: HttpClient,
              private authService: AuthService ) {
  }

  public getAllUsers(): Observable<any[]> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            // tslint:disable-next-line:object-literal-key-quotes
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        };
    return this.http.get<User[]>(this.globalVars.baseURL + '/auth/users/',  httpOptions);
}

}

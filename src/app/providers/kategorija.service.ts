import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kategorija } from '../../models/kategorija';
import { GlobalVars } from './globalVars';

@Injectable()
export class KategorijaService {

    constructor(private http: HttpClient, private globalVars: GlobalVars) { }

    getKategorije(): Observable<Kategorija[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                // tslint:disable-next-line:object-literal-key-quotes
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            };
        return this.http.get<Kategorija[]>(this.globalVars.baseURL + '/layers/kategorije',  httpOptions);
    }
}

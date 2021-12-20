import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVars } from './globalVars';
import { Detalj } from 'src/models/detalj';
import { retry } from 'rxjs/operators';


@Injectable()
export class DetaljiService {

    constructor(private http: HttpClient, private globalVars: GlobalVars) { }

    getDetalji(layerId: number, objectId: number): Observable<Detalj[]> {
        const url = this.globalVars.baseURL + '/layers/detalji';
        const params = new HttpParams()
        .append('layerId', '' + layerId)
        .append('objectId', '' + objectId)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                // tslint:disable-next-line:object-literal-key-quotes
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            params
            };

        return this.http.get<any>(url,  httpOptions)
            .pipe(retry(1));
    }
}

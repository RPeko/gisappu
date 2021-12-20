import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { GlobalVars } from './globalVars';
import { Objekat } from 'src/models/objekat';

@Injectable()
export class ObjekatService {
private urlObjekti = this.globalVars.baseURL + '/api/objekti';
private urlObj = this.globalVars.baseURL + '/api/objekat';

    constructor(private http: HttpClient, private globalVars: GlobalVars) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            // tslint:disable-next-line:object-literal-key-quotes
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })};

    getListaObjekata(): Observable<Objekat[]> {
        const searchstring: string[] = [];
        const params = new HttpParams()
        .append('searchstring0', searchstring[0])
        .append('searchstring1', searchstring[1])
        .append('searchstring2', searchstring[2]);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            params
            };
        return this.http.get<Objekat[]>(this.urlObjekti,  httpOptions);
    }

    updateObjekat(Objekat: Objekat): Observable<Objekat> {
        return this.http.patch<Objekat>(this.urlObj, Objekat);
      }
    
      addObjekat(Objekat: Objekat): Observable<Objekat> {
        return this.http.post<Objekat>(this.urlObj, Objekat);
      }
    
      deleteObjekat(id: number): Observable<Objekat> {
        return this.http.delete<Objekat>("${this.urlObj}/${Objekat.id}");
      }
    
      deleteObjekti(Objekti: Objekat[]): Observable<Objekat[]> {
        return forkJoin(Objekti.map(Objekat => this.http.delete<Objekat>("${this.urlObj}/${Objekat.id}")))
      }
  
}

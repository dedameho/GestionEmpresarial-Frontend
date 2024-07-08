import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRemision } from '../interfaces/remisiones.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RemisionesService {

  constructor(private _http: HttpClient) { }

  getRemisions(queryParams?: HttpParams): Observable<IRemision[]> {
    return this._http.get<IRemision[]>(`${environment.apiURL}/remisiones`, { params: queryParams })
  }

  createRemision(remisionData:any):Observable<IRemision>{
    return this._http.post<IRemision>(`${environment.apiURL}/remision`,remisionData)
  }
}

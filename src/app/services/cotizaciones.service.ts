import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICotizacion, ICotizacionCompleta, ICrearCotizacion } from '../interfaces/cotizaciones.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  constructor(private _http: HttpClient) { }

  getBudgets(queryParams?: HttpParams): Observable<ICotizacion[]> {
    return this._http.get<ICotizacion[]>(`${environment.apiURL}/cotizaciones`, { params: queryParams })
  }

  createBudget(cotizacion:ICrearCotizacion):Observable<ICotizacionCompleta>{
    return this._http.post<ICotizacionCompleta>(`${environment.apiURL}/cotizacion`, cotizacion)
  }

  getBudgetById(id:number):Observable<ICotizacionCompleta>{
    return this._http.get<ICotizacionCompleta>(`${environment.apiURL}/cotizacion/${id}`)
  }

  editBudget(cotizacion:ICrearCotizacion,id:number):Observable<ICotizacionCompleta>{
    return this._http.put<ICotizacionCompleta>(`${environment.apiURL}/cotizacion/${id}`,cotizacion)
  }

  deleteBudget(id:number){
    return this._http.delete(`${environment.apiURL}/cotizacion/${id}`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ICliente } from '../interfaces/clientes.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private _http: HttpClient) { }

  getClients(queryParams?:HttpParams):Observable<ICliente[]>{
    return this._http.get<ICliente[]>(`${environment.apiURL}/clientes`,{params:queryParams});
  }

  createClient(clientData:ICliente):Observable<ICliente>{
    return this._http.post<ICliente>(`${environment.apiURL}/cliente`,clientData);
  }

  deleteClient(id:number){
    return this._http.delete(`${environment.apiURL}/cliente/${id}`);
  }

  editClient(clientData:ICliente,id:number){
    return this._http.put<ICliente>(`${environment.apiURL}/cliente/${id}`,clientData)
  }
}

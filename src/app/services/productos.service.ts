import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/productos.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _http: HttpClient) { }

  getProducts(queryParams?: HttpParams): Observable<IProducto[]> {
    return this._http.get<IProducto[]>(`${environment.apiURL}/productos`, { params: queryParams })
  }

  createProduct(productData:IProducto){
    return this._http.post(`${environment.apiURL}/producto`, productData)
  }

  editProduct(productData:IProducto,id:number){
    return this._http.put(`${environment.apiURL}/producto/${id}`, productData)
  }

  deleteProduct(id:number){
    return this._http.delete(`${environment.apiURL}/producto/${id}`)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CervezasService {
  serverApi: string;

  constructor(private http: HttpClient) {
    this.serverApi = environment.serverApi;
  }


  getCerveza(): Observable<any> {
    return this.http.get(this.serverApi + 'products');
  }

  disableCerveza(idCerveza: number): Observable<any> {
    const endPoints = "deshabilitar-cerveza"
    return this.http.put(this.serverApi + endPoints, {idCerveza: idCerveza});
  }


  updateCerveza(datosEdicion: any): Observable<any> {
    const endPoints = "editar-cerveza"
    return this.http.put(this.serverApi + endPoints, datosEdicion);
  }

  agregarProducto(datosProducto: any): Observable<any> {
    const endPoints = "agregar-cerveza"
    return this.http.post(this.serverApi + endPoints, datosProducto);
  }


  getTodos(): Observable<any> {
    const endPoints = "listar-todos"
    return this.http.get(this.serverApi + endPoints);
  }
}

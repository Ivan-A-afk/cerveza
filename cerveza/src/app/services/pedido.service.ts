import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  serverApi: string;
  headers: any;
  constructor(private http: HttpClient) {
    this.serverApi = environment.serverApi;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }


  getPedidos(): Observable<any> {
    return this.http.get(this.serverApi + 'listado-pedidos');
  }


  getMisPedidos(userId: number): Observable<any> {
    return this.http.get(this.serverApi + `mis-pedidos/${userId}`)
  }

  getDetallePedidos(detalleId:number): Observable<any>{
    return this.http.get(this.serverApi + `detalle-pedidos/${detalleId}`)
  }
}

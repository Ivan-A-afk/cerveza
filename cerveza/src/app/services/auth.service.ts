import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {
  serverApi: string;
  headers: any;
  constructor(private http: HttpClient) {
    this.serverApi = environment.serverApi;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  login(params: any): Observable<any> {
    return this.http.post(this.serverApi + 'login', params, {headers: this.headers})
  }
  register(datosCliente: any): Observable<any> {
    const endPoints = "registrar-cliente"
    return this.http.post(this.serverApi + endPoints, datosCliente);
  }
}

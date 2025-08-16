import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  serverApi: string;
  headers: any;
  constructor(private http: HttpClient) {
    this.serverApi = environment.serverApi;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }


  handlePayment(params: any): Observable<any> {
    return this.http.post(this.serverApi + 'payment', params, {headers: this.headers});
  }


}








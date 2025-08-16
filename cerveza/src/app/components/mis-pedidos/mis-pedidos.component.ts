import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  misPedidos: any;
  constructor(private ps: PedidoService) { }

  ngOnInit(): void {
    this.getMisPedidos();
  }

  getMisPedidos(){
    const token = localStorage.getItem('token');
    if (!token) return;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token!);
    const userId = decodedToken.user_id;
    this.ps.getMisPedidos(userId).subscribe(r => {
      this.misPedidos = r.result
    });
  }

}

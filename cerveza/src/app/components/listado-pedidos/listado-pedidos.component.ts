import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent implements OnInit {
  pedidos: any;
  displayPedido: boolean;
  pedidoSeleccionado:any;
  detallePedidoSeleccionado: any;
  constructor(private ps: PedidoService) { 
    this.displayPedido = false;
  }
  
  ngOnInit(): void {
    this.getPedidos();
    
  }


  getPedidos(){
    this.ps.getPedidos().subscribe(r => {
      this.pedidos = r.result
    });
  }
  showModalPedido(item:any){
    this.displayPedido=true;
    this.pedidoSeleccionado = item;
    this.ps.getDetallePedidos(item.id_pedido).subscribe(r => {
      this.detallePedidoSeleccionado = r.result
      console.log(this.detallePedidoSeleccionado)
    } );
    
  }
}

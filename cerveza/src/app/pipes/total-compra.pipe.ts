import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalCompra'
})
export class TotalCompraPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(args[0] == 'products') return this.getTotal(value);
    if(args[0] == 'orders') return this.getTotalPedidos(value);


    return 0;
  }


  getTotal(array: any) {
    let total = 0;

    array.map((el: any) => {
      total += el.cant * el.price
    })
    return total
  }


  getTotalPedidos(array: any) {
    let total = 0;

    array.map((el: any) => {
      total += parseInt(el.total_pedido)
    })
    return total
  }

}





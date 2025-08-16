import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() {
    let cartItems: any = JSON.parse(localStorage.getItem('products')!) || [];
    this.items.next(cartItems);
  }

  //servicio para compartir los datos almacenados en el carrito
  addToCart(item: any) {
    //conseguimos el arreglo actual
    const products = this.items.value;
    //buscamos si dentro del arreglo esta el producto que vamos a agregar nuevamente
    if(products.some((product: any) => product.id == item.id)){
      //si esta, recorrer el arreglo de carrito y sumarle la nueva cantidad al producto
      products.map((product: any) => {
        //se encuentra el producto comparando ids y si es el producto que se esta agregando sumarle la cantidad nueva
        if(product.id == item.id) product.cant += item.cant;
      })
    }else{
      //sino agregar el nuevo producto al carrito
      products.push(item);
    }
    //gaurdar el producto en la memoria del localstorage
    localStorage.setItem('products', JSON.stringify(products));
    //emitir el cambio
    this.items.next(products);
  }

  isCartUpdated() {
    return this.items.asObservable();
  }


  removeProduct(item: any){
    const products = this.items.value;
    const filteredProducts = products.filter((product: any) =>  product.id != item.id);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    this.items.next(filteredProducts);
  }



}

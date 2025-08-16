import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  displayModal: boolean;
  displayModalView: boolean;
  @Input() item: any;
  cant: number = 1;
  items: any;
  selectedProduct: any;
  constructor(private cartService: CartService) {
    this.items = this.cartService.items;
    this.displayModal = false;
    this.displayModalView = false;
  }

  ngOnInit(): void {}
  showModalDialog(item: any) {
    this.displayModal = true;
    this.selectedProduct = item;
  }
  showModalDialogView() {
    this.displayModalView = true;
  }

  addProduct() {
    let product = {
      cant: this.cant,
      id: parseInt(this.item.id_producto),
      name: this.item.nombre_producto,
      price: parseInt(this.item.precio_producto)
    }
    this.cant=1;
    this.cartService.addToCart(product);
    this.displayModal=false;
    window.location.reload();
  }
}

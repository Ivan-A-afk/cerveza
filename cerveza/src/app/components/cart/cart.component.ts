import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxMercadopagoService } from 'ngx-mercadopago';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any;
  display: boolean = true;
  @Input() visible: boolean = false;
  @Output() cartClosed: EventEmitter<any> = new EventEmitter();

  showDialog() {
    this.display = false;
  }

  constructor(
    private ps: PaymentService,
    private ngxMpService: NgxMercadopagoService,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartService.isCartUpdated().subscribe((products: any) => {
      this.products = products;
    });
  }

  ngOnInit(): void {}

  handlePayment() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token!);

    const params = {
      products: this.products,
      userId: decodedToken.user_id,
    };

    this.ps.handlePayment(params).subscribe((r) => {
      
      window.location.href = r.init_point;
    });
  }

  handleClick() {
    this.router.navigate(['/#/products']);
    this.cartClosed.emit(false);
  }

  onClose() {
    this.cartClosed.emit(false);
  }

  clearItem(item: any) {
    this.cartService.removeProduct(item);
    window.location.reload();
  }
}

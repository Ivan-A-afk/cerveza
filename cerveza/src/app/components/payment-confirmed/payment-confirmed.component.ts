import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-confirmed',
  templateUrl: './payment-confirmed.component.html',
  styleUrls: ['./payment-confirmed.component.css']
})
export class PaymentConfirmedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.clearCart();
  }


  clearCart(){
    localStorage.clear();
  }

}

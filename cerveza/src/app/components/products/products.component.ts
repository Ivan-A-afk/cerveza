import { Component, OnInit } from '@angular/core';
import { CervezasService } from 'src/app/services/cervezas.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any;
  constructor(private cs: CervezasService) {}

  ngOnInit(): void {
    this.getCervezas();
  }
  getCervezas() {
    this.cs.getCerveza().subscribe((res) => {
      this.products = res;
    });
  }
}

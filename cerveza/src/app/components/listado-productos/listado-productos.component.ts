import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CervezasService } from 'src/app/services/cervezas.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
})
export class ListadoProductosComponent implements OnInit {
  displayAdd: boolean = false;
  products: any;
  displayEdit: boolean = false;
  editarProducto: FormGroup;
  productoSeleccionado: any;
  formAddProduct = new FormGroup({
    nombreProductoNuevo: new FormControl(''),
    precioProductoNuevo: new FormControl(),
    stockProductoNuevo: new FormControl(),
    urlImagenProductoNuevo: new FormControl(''),
    descripcionProductoNuevo: new FormControl(''),
  });
  constructor(private cs: CervezasService, private fb: FormBuilder) {
    this.editarProducto = this.fb.group({
      idProducto: [0],
      nombreProducto: [''],
      precioProducto: [0],
      stockProducto: [0],
      descripcionProducto: [''],
      urlImagenProducto: [''],
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.cs.getTodos().subscribe((res) => {
      this.products = res;
    });
  }

  handleRemove(item: any) {
    this.cs.disableCerveza(item.id_producto).subscribe((r) => {
      this.getProducts();
    });
  }

  handleEdit(item: any) {
    this.productoSeleccionado = item;

    this.editarProducto.controls['idProducto'].setValue(item.id_producto);
    this.editarProducto.controls['nombreProducto'].setValue(
      item.nombre_producto
    );
    this.editarProducto.controls['precioProducto'].setValue(
      item.precio_producto
    );
    this.editarProducto.controls['stockProducto'].setValue(item.stock);
    this.editarProducto.controls['descripcionProducto'].setValue(
      item.descripcion_producto
    );
    this.editarProducto.controls['urlImagenProducto'].setValue(item.img_url);
    this.displayEdit = true;
  }

  guardarCambios() {
    this.cs.updateCerveza(this.editarProducto.value).subscribe((r) => {
      this.getProducts();
      this.displayEdit = false;
    });
  }

  showDialogAdd() {
    this.displayAdd = true;
  }

  agregarProducto() {
    this.cs.agregarProducto(this.formAddProduct.value).subscribe((r) => {
      this.displayAdd = false;
      this.getProducts();
    });
  }
}

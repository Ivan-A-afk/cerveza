import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './auth/loginn/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { InformationComponent } from './components/information/information.component';
import { AdminGuard } from './guards/admin.guard';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AuthGuard } from './guards/auth.guard';
import { ListadoPedidosComponent } from './components/listado-pedidos/listado-pedidos.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { PaymentConfirmedComponent } from './components/payment-confirmed/payment-confirmed.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AutentificacionGuard],
    component: MainComponent ,
    children: [
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'information',
        component: InformationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      
      {
        path: 'mis-pedidos',
        canActivate: [AuthGuard],
        component: MisPedidosComponent
      },
      {
        path: '',
        redirectTo: 'products', //Redireccionar a notfound
        pathMatch: 'full'
      },
      {
        path: 'payment-complete',
        component: PaymentConfirmedComponent
      },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      {
        path: 'listado-productos',
        component: ListadoProductosComponent
      },
      {
        path: 'listado-pedidos',
        component: ListadoPedidosComponent
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: 'products', //Redireccionar a notfound
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

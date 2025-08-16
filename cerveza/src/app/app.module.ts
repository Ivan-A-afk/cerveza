import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  ButtonModule} from 'primeng/button';
import {  TableModule} from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MainComponent } from './pages/main/main.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CervezasService } from './services/cervezas.service';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import {PasswordModule} from 'primeng/password';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SplitButtonModule} from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import { InformationComponent } from './components/information/information.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { LoginComponent } from './auth/loginn/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { NgxMercadopagoModule } from 'ngx-mercadopago';
import {DropdownModule} from 'primeng/dropdown';
import {SlideMenuModule} from 'primeng/slidemenu';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { ListadoPedidosComponent } from './components/listado-pedidos/listado-pedidos.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import {CalendarModule} from 'primeng/calendar';
import {APP_BASE_HREF} from '@angular/common';
import { PaymentConfirmedComponent } from './components/payment-confirmed/payment-confirmed.component';  
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TotalCompraPipe } from './pipes/total-compra.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    AdminComponent,
    CardComponent,
    ProductsComponent,
    CartComponent,
    InformationComponent,
    HeaderComponent,
    PedidosComponent,
    ListadoProductosComponent,
    ListadoPedidosComponent,
    MisPedidosComponent,
    PaymentConfirmedComponent,
    TotalCompraPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    DialogModule,
    BrowserAnimationsModule,
    SplitButtonModule,
    ToastModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    FieldsetModule,
    TabViewModule,
    AutoCompleteModule,
    NgxMercadopagoModule.forRoot({
      publishKey: 'APP_USR-b8051bce-2344-4f1e-b3c5-f47556a23163',
      pathSDK: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js'
      }),
    DropdownModule,
    SlideMenuModule,
    InputTextareaModule,
    CalendarModule,
  ],
  providers: [
    CervezasService,
    MessageService,
    AuthService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

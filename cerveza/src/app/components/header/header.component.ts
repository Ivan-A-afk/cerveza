import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLogged: boolean = false;
  display: boolean = true;
  displayModal: boolean = false;
  userName: string = '';
  userRole: number = 1;
  items: MenuItem[] = [];
  showCart: boolean = false;
  @Input() adminMode: boolean = false;
  constructor(private router: Router) {
    this.displayModal = false;
  }

  ngOnInit(): void {
    this.getSession();
  }

  cerrar() {
    this.displayModal = false;
  }

  ngOnChanges() {}

  getSession() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token!);
    this.userName = decodedToken.user_name;
    this.userRole = decodedToken.role;
    this.userLogged = true;
    this.getNav();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  handleCart() {
    this.showCart = true;
  }

  handleClose(event: any) {
    this.showCart = event;
  }

  getNav() {
    this.userRole == 2
      ? (this.items = [
          {
            label: 'Listado de pedidos',
            icon: 'pi pi-list',
            command: (event) => {
              this.router.navigate(['/admin/listado-pedidos']);
            },
          },
          {
            label: 'listado productos',
            icon: 'pi pi-list',
            command: (event) => {
              this.router.navigate(['/admin/listado-productos']);
            },
          },
          {
            label: 'Cerrar Sesion',
            icon: 'pi pi-sign-out',
            command: (event) => {
              this.logout();
            },
          },
        ])
      : (this.items = [
          {
            label: 'Mis pedidos',
            icon: 'pi pi-list',
            command: (event) => {
              this.router.navigate(['/mis-pedidos']);
            },
          },
          {
            label: 'Cerrar Sesion',
            icon: 'pi pi-sign-out',
            command: (event) => {
              this.logout();
            },
          },
        ]);
  }
}

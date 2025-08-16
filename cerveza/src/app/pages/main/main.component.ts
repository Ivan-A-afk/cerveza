import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  adminMode: boolean = false;
  userLogged: boolean = false;
  display: boolean = true;
  displayModal : boolean = false;
  userName: string = '';
  userRole: number = 1;
  constructor(private router: Router) {
    this.displayModal = false;
   }

  ngOnInit(): void {
    this.getSession();
  }
 
  cerrar(){
    this.displayModal=false;
  }

  getSession() {
    const token = localStorage.getItem('token');
    if(!token) return;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token!);
    this.userName = decodedToken.user_name;
    this.userRole = decodedToken.role;
    this.userLogged = true; 
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
  
  
}

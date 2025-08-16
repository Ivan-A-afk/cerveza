import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(HeaderComponent, { static: false }) childC!: HeaderComponent;
  displayModal: boolean;
  displayBasic: boolean;
  form: FormGroup;
  displayAgeCheck: boolean = true;
  isNotOlder: boolean = false;
  formRegister = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    contrasena: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    correo: new FormControl('',[Validators.required]),
    telefono: new FormControl('',[Validators.required]),
    direccion: new FormControl('',[Validators.required]),
    edad: new FormControl(null),
  });

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.displayBasic = false;
    this.displayModal = false;
    this.form = this.fb.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });
  }
  ngOnInit(): void {}
  saved() {
    this.findInvalidControls(this.formRegister)
    if(!this.formRegister.valid) return 
    this.authService.register(this.formRegister.value).subscribe((r) => {
      if(r.error) return this.messageService.add({severity:'error', summary: 'Error', detail: 'No registrado'});
      this.messageService.add({severity:'success', summary: 'Correcto', detail: 'Registrado correctamente'});
      this.displayModal = false;                
    });
  }
  showModalDialog() {
    this.displayModal = true;
  }
  onLogin(): void {
    //CHECKEAR QUE EL FORMULARIO ESTE COMPLETO Y SEA VALIDO, SINO ES VALIDO MOSTRAR CUAL FALTA POR RELLENAR
    if(!this.form.valid) return this.findInvalidControls(this.form)

    //TODO OK, INTENTAMOS LOGEAR 
    this.authService.login(this.form.value).subscribe((r) => {
      //SI LA API DEVUELVE UN ERROR ENTONCES HAY QUE MOSTAR UN ERROR EN LA PANTALLA
      if (r.error) return this.messageService.add({severity:'error', summary: 'Invalido', detail: 'Credenciales invalidas'});

      //SI TODO ESTA OK ENTONCES REDIRECCIONAR A PRODUCTS Y SETEAR EL TOKEN DE ACCESO EN EL LOCALSTORAGE
      localStorage.setItem('token', r.token);
      this.router.navigate(['/products']).then(() => {
        window.location.reload();
      });
    });
  }

  handleAgeCheck() {
    this.displayAgeCheck = false;
  }
  public findInvalidControls(formulario:any): void {
    const invalid = [];
    const controls = formulario.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    invalid.map(el => this.messageService.add({severity:'error', summary: 'Error', detail: `Completa el campo ${el}`}) )
}
}

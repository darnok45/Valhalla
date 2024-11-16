import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logueado = false; // variable booleana para el botón de Registro e Inicio de Sesión
  deslogueado = true; // variable booleana para el botón de Cerrar Sesión
  admin = false; // Para verificar si el usuario es admin


  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router,
    public auth: AngularFireAuth,
  ){}

  // Cambia los valores de logueado y deslogueado para ocultar los primeros y mostrar el último
/*   iniciar(){
    this.logueado = false;
    this.deslogueado = true;
  } */

/*   cerrarSesion(){
    this.deslogueado = false;
    this.servicioAuth.cerrarSesion();

    this.servicioRutas.navigate(['/']);
    this.logueado = true;
  } */

   
  ngOnInit(){
    if(localStorage.getItem("connected")){
      this.logueado = true;
      this.deslogueado = false;
    }else{
      this.logueado = false;
      this.deslogueado = true;
    }

    // Comprobación de rol de admin
    if(localStorage.getItem("rol")){
      this.admin = true;
    }
  }

  cerrarSesion(){
    this.servicioAuth.cerrarSesion()
    this.logueado = false;
    this.deslogueado = true;
    localStorage.removeItem("rol")
    localStorage.removeItem("connected")
  }
}

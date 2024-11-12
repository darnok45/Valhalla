import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  producto = true;
  maquinas = false;
  user = false;
  preciopases = false;

  mostrarProductos() {
    this.producto = true;
    this.maquinas = false;
    this.user = false;
    this.preciopases = false;
  }

  mostrarMaquinas() {
    this.producto = false;
    this.maquinas = true;
    this.user = false;
    this.preciopases = false;
  }

  mostrarUsuarios() {
    this.producto = false;
    this.maquinas = false;
    this.user = true;
    this.preciopases = false;
  }

  mostrarPrecioPases() {
    this.producto = false;
    this.maquinas = false;
    this.user = false;
    this.preciopases = true;
  }

}

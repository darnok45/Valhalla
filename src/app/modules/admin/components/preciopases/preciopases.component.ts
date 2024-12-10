import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Preciopaselibre } from 'src/app/models/preciopaselibre';
import { Preciopasetresd } from 'src/app/models/preciopasetresd';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-preciopases',
  templateUrl: './preciopases.component.html',
  styleUrls: ['./preciopases.component.css']
})
export class PreciopasesComponent {

  // Arrays para almacenar los datos obtenidos de los precios
  precioPaselibre : Preciopaselibre[] = [];
  precioPasetresd : Preciopasetresd[] = [];

  // Formulario para la edición de precios. Inicialicados Inicializados en 0 y requeridos
  preciopaselibre = new FormGroup({
    precio: new FormControl(0,Validators.required)
  })

  preciopasetresd = new FormGroup({
    precio: new FormControl(0,Validators.required)
  })
  
  constructor(
    // Importamos el servicio CRUD
    public servicioCrud: CrudService
  ){}

  // Función para actualizar el precio de pase libre
  actualizarPrecioPaseLibre(){
    if(this.preciopaselibre.valid){ // Verifica si el formulario es válido
      let nuevoPrecio: Preciopaselibre = {
        idPaselibre: '1', // ID FIJO
        precio: this.preciopaselibre.value.precio! // Obtiene el precio del formulario
      }

      // Llamamos al servicio CRUD para actualizar el precio
      this.servicioCrud.editarPreciopaselibre('1',nuevoPrecio)
      .then(precio => {
        alert("El precio ha sido actualizado con exito") // Mensaje en caso de éxito
      })
      .catch(error => {
        alert("No se pudo modificar el precio \n" +error) // Mensaje en caso de error
      })
    }
  }

  // Función para actualizar el precio del pase de tres dias
  actualizarPrecioTresd(){
    if(this.preciopasetresd.valid){ // Verifica si el formulario es válido
      let nuevoPrecio: Preciopasetresd = {
        idPasetresd: '1', // ID FIJO
        precio: this.preciopasetresd.value.precio! // Obtiene el precio del formulario
      }

      this.servicioCrud.editarPreciopasetresd('1',nuevoPrecio)
      .then(precio => {
        alert("El precio ha sido actualizado con exito") // Mensaje en caso de éxito
      })
      .catch(error => {
        alert("No se pudo modificar el precio \n" +error) // Mensaje en caso de error
      })
    }
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void{
    // Obtiene el precio de pase libre desde el servicio crud con el método subscribe y lo guarda
    this.servicioCrud.obtenerPreciopaselibre().subscribe( precio => {
      this.precioPaselibre = precio;
    });

    // Obtiene el precio del pase de tres dias desde el servicio crud con el metodo subscribe y lo guarda
    this.servicioCrud.obtenerPreciopasetresd().subscribe( precio => {
      this.precioPasetresd = precio;
    });
  }
}

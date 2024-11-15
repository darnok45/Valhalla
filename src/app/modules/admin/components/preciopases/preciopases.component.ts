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

  precioPaselibre : Preciopaselibre[] = [];
  precioPasetresd : Preciopasetresd[] = [];

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

  actualizarPrecioPaseLibre(){
    if(this.preciopaselibre.valid){
      let nuevoPrecio: Preciopaselibre = {
        idPaselibre: '1',
        precio: this.preciopaselibre.value.precio!
      }

      this.servicioCrud.editarPreciopaselibre('1',nuevoPrecio)
      .then(precio => {
        alert("El precio ha sido actualizado con exito")
      })
      .catch(error => {
        alert("No se pudo modificar el precio \n" +error)
      })
    }
  }

  actualizarPrecioTresd(){
    if(this.preciopasetresd.valid){
      let nuevoPrecio: Preciopasetresd = {
        idPasetresd: '1',
        precio: this.preciopasetresd.value.precio!
      }

      this.servicioCrud.editarPreciopasetresd('1',nuevoPrecio)
      .then(precio => {
        alert("El precio ha sido actualizado con exito")
      })
      .catch(error => {
        alert("No se pudo modificar el precio \n" +error)
      })
    }
  }


  ngOnInit(): void{
    this.servicioCrud.obtenerPreciopaselibre().subscribe( precio => {
      this.precioPaselibre = precio;
    });

    this.servicioCrud.obtenerPreciopasetresd().subscribe( precio => {
      this.precioPasetresd = precio;
    });
  }
}

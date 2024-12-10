import { Component } from '@angular/core';
import { Preciopaselibre } from 'src/app/models/preciopaselibre';
import { Preciopasetresd } from 'src/app/models/preciopasetresd';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-pases',
  templateUrl: './pases.component.html',
  styleUrls: ['./pases.component.css']
})
export class PasesComponent{

  // Arrays para almacenar los datos obtenidos de los precios
  precioPaselibre : Preciopaselibre[] = [];
  precioPasetresd : Preciopasetresd[] = [];

  constructor(
    // Importamos el servicio CRUD
    public servicioCrud: CrudService
  ){}

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

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

  precioPaselibre : Preciopaselibre[] = [];
  precioPasetresd : Preciopasetresd[] = [];

  constructor(
    // Importamos el servicio CRUD
    public servicioCrud: CrudService
  ){}

  ngOnInit(): void{
    this.servicioCrud.obtenerPreciopaselibre().subscribe( precio => {
      this.precioPaselibre = precio;
      console.log("Datos de preciosPaselibre: ", this.precioPaselibre)
    });
  }
}

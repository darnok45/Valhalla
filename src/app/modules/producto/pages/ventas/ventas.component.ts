import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  // Variable para controlar el filtro seleccionado en la vista
  selectedFilter = 'todo';

  // Método para cambiar el filtro basado en un evento
  cambiarFiltro(event: any) {
    this.selectedFilter = event.value; // Actualiza el filtro seleccionado con el valor del evento
  }
}

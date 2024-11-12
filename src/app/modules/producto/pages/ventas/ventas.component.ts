import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  selectedFilter = 'todo';

  cambiarFiltro(event: any) {
    this.selectedFilter = event.value;
  }
}

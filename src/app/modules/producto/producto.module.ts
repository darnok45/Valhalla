import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { VentasComponent } from './pages/ventas/ventas.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    VentasComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { VentasComponent } from './pages/ventas/ventas.component';
import { CardComponent } from './components/card/card.component';

// Select
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    VentasComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class ProductoModule { }

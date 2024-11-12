import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { CardComponent } from './components/card/card.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule({
  declarations: [
    CardComponent,
    InicioComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }

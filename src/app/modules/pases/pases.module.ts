import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasesRoutingModule } from './pases-routing.module';
import { PasesComponent } from './pages/pases/pases.component';


@NgModule({
  declarations: [
    PasesComponent
  ],
  imports: [
    CommonModule,
    PasesRoutingModule
  ]
})
export class PasesModule { }

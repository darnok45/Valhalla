import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasesComponent } from './pages/pases/pases.component';

const routes: Routes = [
  {
    path:"pases",component:PasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasesRoutingModule { }

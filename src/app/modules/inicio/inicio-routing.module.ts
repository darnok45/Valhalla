import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RutinaComponent } from '../rutina/rutina.component';


const routes: Routes = [
  {
    path:"",component: InicioComponent
  },
  {
    path:"inicio",component:InicioComponent
  },
  {
    path:"rutina",component:RutinaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }

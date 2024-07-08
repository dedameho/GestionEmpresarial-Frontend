import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemisionesComponent } from './remisiones.component';

const routes: Routes = [
  {
    path:'',
    component:RemisionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemisionesRoutingModule { }

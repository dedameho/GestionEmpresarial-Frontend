import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionesComponent } from './cotizaciones.component';
import { CrearCotizacionComponent } from '../crear-cotizacion/crear-cotizacion.component';
import { EditarCotizacionComponent } from '../editar-cotizacion/editar-cotizacion.component';

const routes: Routes = [
  {
    path: '',
    component: CotizacionesComponent
  },
  {
    path:'crear',
    component:CrearCotizacionComponent,
    data:{title:'Crear Cotización'}
  },
  {
    path:'editar/:id',
    component:EditarCotizacionComponent,
    data:{title:'Editar Cotización'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionesRoutingModule { }

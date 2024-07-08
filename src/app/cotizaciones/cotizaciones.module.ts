import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { CotizacionesComponent } from './cotizaciones.component';
import { TableModule } from '../table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearCotizacionComponent } from '../crear-cotizacion/crear-cotizacion.component';
import { EditarCotizacionComponent } from '../editar-cotizacion/editar-cotizacion.component';
import { CrearRemisionComponent } from '../crear-remision/crear-remision.component';


@NgModule({
  declarations: [
    CotizacionesComponent,
    CrearCotizacionComponent,
    EditarCotizacionComponent,
    CrearRemisionComponent
  ],
  imports: [
    CommonModule,
    CotizacionesRoutingModule,
    TableModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class CotizacionesModule { }

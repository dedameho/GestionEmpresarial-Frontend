import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemisionesRoutingModule } from './remisiones-routing.module';
import { RemisionesComponent } from './remisiones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../table/table.module';


@NgModule({
  declarations: [
    RemisionesComponent
  ],
  imports: [
    CommonModule,
    RemisionesRoutingModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class RemisionesModule { }

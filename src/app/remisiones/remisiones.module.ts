import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemisionesRoutingModule } from './remisiones-routing.module';
import { RemisionesComponent } from './remisiones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../table/table.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    RemisionesComponent
  ],
  imports: [
    CommonModule,
    RemisionesRoutingModule,
    ReactiveFormsModule,
    TableModule,
    MatDialogModule
  ]
})
export class RemisionesModule { }

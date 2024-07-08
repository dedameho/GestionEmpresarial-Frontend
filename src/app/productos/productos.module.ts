import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { TableModule } from '../table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';


@NgModule({
  declarations: [
    ProductosComponent,
    CrearProductoComponent,
    EditarProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    TableModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ProductosModule { }

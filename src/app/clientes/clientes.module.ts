import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { TableModule } from '../table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { MatDialogModule } from '@angular/material/dialog'
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';


@NgModule({
  declarations: [
    ClientesComponent,
    CrearClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ClientesModule { }

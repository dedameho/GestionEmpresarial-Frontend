import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
    data: { title: 'Clientes' }
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule),
    data: { title: 'Productos' }
  },
  {
    path: 'cotizaciones',
    loadChildren: () => import('./cotizaciones/cotizaciones.module').then(m => m.CotizacionesModule),
    data: { title: 'Cotizaciones' }
  },
  {
    path: 'remisiones',
    loadChildren: () => import('./remisiones/remisiones.module').then(m => m.RemisionesModule),
    data: { title: 'Remisiones' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

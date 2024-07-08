import { Component, OnInit } from '@angular/core';
import { RemisionesService } from '../services/remisiones.service';
import { HttpParams } from '@angular/common/http';
import { IRemision } from '../interfaces/remisiones.interface';

@Component({
  selector: 'app-remisiones',
  templateUrl: './remisiones.component.html',
  styleUrls: ['./remisiones.component.css']
})
export class RemisionesComponent implements OnInit {

  data: any[] = []

  columns = [
    { key: 'codigo', title: 'Código' },
    { key: 'fecha', title: 'Fecha', isDate: true },
    { key: 'codigoCotizacion', title: 'Cotización', isHTML: true },
    { key: 'ordenCompra', title: 'Orden de Compra' },
    { key: 'estado', title: 'Estado', isHTML: true }
  ];

  contextMenuItems = [
    { label: 'Editar', action: (row: any) => console.log(row), icon: 'fa-edit' },
    { label: 'Eliminar', action: (row: any) => console.log(row), icon: 'fa-trash text-orange-500' }
  ];

  constructor(
    private _remisionesService: RemisionesService
  ) { }

  ngOnInit(): void {
    this.getRemisions()
  }

  getRemisions(queryParams?: HttpParams) {
    this._remisionesService.getRemisions(queryParams).subscribe(res => {
      this.data = res.map(remision => ({
        id: remision.id,
        fecha: remision.fecha,
        cotizacionId: remision.cotizacionId,
        codigo: remision.codigo,
        ordenCompra: remision.ordenCompra,
        estado: remision.estado == 'Firmada' ? '<i class="fa-solid fa-circle text-green-500" title="Firmada"></i>' : '<i class="fa-solid fa-circle text-blue-500" title="Pendiente por firma"></i>',
        codigoCotizacion: `<a href="cotizaciones/editar/${remision.Cotizacion.id}">${remision.Cotizacion.codigo}</a>`
      }))
    })
  }

}

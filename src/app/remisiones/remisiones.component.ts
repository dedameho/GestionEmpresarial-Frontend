import { Component, OnInit } from '@angular/core';
import { RemisionesService } from '../services/remisiones.service';
import { HttpParams } from '@angular/common/http';
import { IRemision } from '../interfaces/remisiones.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-remisiones',
  templateUrl: './remisiones.component.html',
  styleUrls: ['./remisiones.component.css']
})
export class RemisionesComponent implements OnInit {

  data: any[] = []

  filterForm!: FormGroup

  columns = [
    { key: 'codigo', title: 'Código' },
    { key: 'fecha', title: 'Fecha', isDate: true },
    { key: 'codigoCotizacion', title: 'Cotización', isHTML: true },
    { key: 'ordenCompra', title: 'Orden de Compra' },
    { key: 'estado', title: 'Estado', isHTML: true }
  ];

  contextMenuItems = [
    { label: 'Imprimir', action: (row: any) => this.getPDF(row), icon: 'fa-edit', visible: (row: any) => true },
    { label: 'Firmar', action: (row: any) => this.signRemision(row), icon: 'fa-signature', visible: (row: any) => this.isVisible(row) },
    { label: 'Eliminar', action: (row: any) => this.deleteRemision(row), icon: 'fa-trash text-orange-500', visible: (row: any) => this.isVisible(row) }
  ];

  constructor(
    private _remisionesService: RemisionesService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getRemisions()
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(values => {
        this.onSubmit()
      });
  }

  initForm() {
    this.filterForm = this.fb.group({
      codigo: [''],
      codigoCotizacion: [''],
      ordenCompra: [''],
      fechaInicio: [null],
      fechaFin: [null],
      estado: ['']
    });
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

  getPDF(row: any) {
    window.open(`${environment.apiURL}/remision/${row.codigo}/pdf`)
  }

  signRemision(row: any) {
    const dialog = this._dialog.open(ConfirmComponent, {
      data: {
        title: 'Firmar remisión',
        message: `¿Está seguro de marcar como firmada la remisión ${row.codigo}?`
      }
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this._remisionesService.signRemision(row.id).subscribe(res => {
          this._toast.showSuccessToast('Remisión firmada exitosamente')
          this.getRemisions()
        })
      }
    })
  }

  deleteRemision(row: any) {
    const dialog = this._dialog.open(ConfirmComponent, {
      data: {
        title: 'Eliminar remisión',
        message: `¿Está seguro de eliminar la remisión ${row.codigo}?`
      }
    })
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this._remisionesService.deleteRemision(row.id).subscribe(res => {
          this._toast.showSuccessToast('Remisión eliminada exitosamente')
          this.getRemisions()
        })
      }
    })
  }

  isVisible(row: any) {
    return !(row.estado == '<i class="fa-solid fa-circle text-green-500" title="Firmada"></i>')
  }

  onSubmit() {
    const queryParams = this.filterForm.value
    this.getRemisions(queryParams)
  }

}

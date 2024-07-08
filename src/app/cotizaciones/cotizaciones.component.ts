import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from '../services/cotizaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../services/toast.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { CrearRemisionComponent } from '../crear-remision/crear-remision.component';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  filterForm!: FormGroup;

  data: any = []

  contextMenuItems = [
    { label: 'Editar', action: (row: any) => this.editBudget(row), icon: 'fa-edit' },
    { label: 'Imprimir', action: (row: any) => this.downloadPDF(row), icon: 'fa-file-pdf' },
    { label: 'Crear Remision', action: (row: any) => this.createRemision(row), icon: 'fa-shipping-fast' },
    { label: 'Eliminar', action: (row: any) => this.deleteBudget(row), icon: 'fa-trash text-orange-500' }
  ];

  columns = [
    { key: 'codigo', title: 'Código' },
    { key: 'cliente', title: 'Cliente' },
    { key: 'fecha', title: 'Fecha', isDate: true },
    { key: 'subtotal', title: 'Subtotal' },
    { key: 'iva', title: 'IVA' },
    { key: 'total', title: 'Total' },
    { key: 'estado', title: 'Estado', isHTML: true },
  ];

  constructor(
    private _cotizacionesService: CotizacionesService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    private _toast: ToastService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.filterForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.onSubmit();
    });
    this.getBudgets()
  }

  initForm() {
    this.filterForm = this.fb.group({
      clienteNombre: [''],
      estado: [''],
      fechaInicio: [''],
      fechaFin: [''],
      totalMin: [0, [Validators.min(0)]],
      totalMax: [0, [Validators.min(0)]],
      codigo: ['']
    });
  }

  getBudgets(queryParams?: HttpParams) {
    this._cotizacionesService.getBudgets(queryParams).subscribe(res => {
      this.data = res.map(cot => ({
        id: cot.id,
        fecha: cot.fecha,
        clienteId: cot.clienteId,
        total: cot.total,
        subtotal: cot.subtotal,
        iva: (cot.subtotal * (cot.iva / 100)),
        estado: cot.estado == 'aprobada' ? '<i class="fa-solid fa-circle text-green-500" title="Aprobada"></i>' : cot.estado == 'rechazada' ? '<i class="fa-solid fa-circle text-red-500" title="Rechazado"></i>' : '<i class="fa-solid fa-circle text-blue-500" title="Pendiente"></i>',
        codigo: cot.codigo,
        updatedAt: cot.updatedAt,
        cliente: cot.Cliente.nombre
      }))
    })
  }

  onSubmit() {
    const queryParams = this.filterForm.value
    this.getBudgets(queryParams)
  }

  deleteBudget(row: any) {
    const dialog = this._dialog.open(ConfirmComponent)
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this._cotizacionesService.deleteBudget(row.id).subscribe(res => {
          this.onSubmit()
          this._toast.showSuccessToast('Cotización eliminada exitosamente')
        })
      }
    })
  }

  downloadPDF(row: any) {
    window.open(`${environment.apiURL}/cotizacion/${row.codigo}/pdf`)
  }

  editBudget(row:any){
    this._router.navigate(['/cotizaciones/editar', row.id])
  }

  createRemision(row:any){
    this._dialog.open(CrearRemisionComponent,{
      width:'40vw',
      data:row.id
    })
  }

}

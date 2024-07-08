import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CotizacionesService } from '../services/cotizaciones.service';
import { ICotizacionCompleta } from '../interfaces/cotizaciones.interface';
import { IProducto } from '../interfaces/productos.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { ProductosService } from '../services/productos.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-editar-cotizacion',
  templateUrl: './editar-cotizacion.component.html',
  styleUrls: ['./editar-cotizacion.component.css']
})
export class EditarCotizacionComponent implements OnInit {

  cotizacionForm!: FormGroup;

  budgetId!: number;

  cotizacion!: ICotizacionCompleta;

  productos: IProducto[] = []

  estados:{value:string,label:string}[]=[
    {value:'pendiente',label:'Pendiente'},
    {value:'aprobada',label:'Aprobada'},
    {value:'rechazada',label:'Rechazada'},
  ]

  constructor(
    private _route: ActivatedRoute,
    private _cotizacionesService: CotizacionesService,
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private _toast: ToastService,
  ) {
    this.budgetId = this._route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getBudgetData()
    this.initForm()
    this.setupDetallesListener();
    this.getProducts()
  }

  getBudgetData() {
    this._cotizacionesService.getBudgetById(this.budgetId).subscribe(res => {
      this.cotizacion = res;
      this.cotizacionForm.patchValue(this.cotizacion)
      this.loadDetalle()
    })
  }

  initForm() {
    this.cotizacionForm = this.fb.group({
      clienteId: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: false }],
      subtotal: [{ value: 0, disabled: true }],
      iva: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      detalles: this.fb.array([])
    });
  }

  getProducts() {
    this.productosService.getProducts().subscribe(res => {
      this.productos = res
    })
  }

  private setupDetallesListener() {
    const detalles = this.cotizacionForm.get('detalles') as FormArray;
    detalles.valueChanges.subscribe(() => {
      this.actualizarTotales();
    });
  }

  productChange(i: number) {
    const formProduct = this.detalles.controls[i]
    const productValues = formProduct.value
    const selectedProduct = this.productos.find(product => product.id?.toString() === productValues.productoId);
    if (selectedProduct) {
      formProduct.patchValue({ precio: parseInt(selectedProduct.precio.toString()) })
      this.actualizarTotales()
    }
  }

  get detalles() {
    return this.cotizacionForm.get('detalles') as FormArray;
  }

  addDetalle() {
    const detalleForm = this.fb.group({
      productoId: ['', [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: ['']
    });

    this.detalles.push(detalleForm);
  }

  loadDetalle() {
    this.cotizacion.DetalleCotizacions.map(detalle => {
      const detalleForm = this.fb.group({
        id: [detalle.id],
        productoId: ['', [Validators.required]],
        cantidad: [1, [Validators.required, Validators.min(1)]],
        precio: ['']
      });
      detalleForm.patchValue(detalle as any)
      this.detalles.push(detalleForm);
    })
  }

  removeDetalle(index: number) {
    this.detalles.removeAt(index);
    this.actualizarTotales();
  }

  actualizarTotales() {
    let subtotal = 0;
    this.detalles.controls.forEach((detalle: any) => {
      const cantidad = detalle.get('cantidad')?.value || 0;
      const precio = detalle.get('precio')?.value || 0;
      subtotal += cantidad * precio;
    });

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    this.cotizacionForm.patchValue({
      subtotal: subtotal.toFixed(0),
      iva: iva.toFixed(0),
      total: total.toFixed(0)
    });
  }

  onSubmit() {
    if (this.cotizacionForm.valid && this.detalles.length > 0) {
      const formValues = this.cotizacionForm.getRawValue();
      const budget = {
        cotizacion: {
          ...formValues,
        },
        detalles: [
          ...formValues.detalles
        ]
      }
      delete budget.cotizacion.iva
      delete budget.cotizacion.detalles
      this._cotizacionesService.editBudget(budget,this.budgetId).subscribe(res => {
        this._toast.showSuccessToast('Cotización actualizada exitosamente')
        this.getBudgetData()
      })
    } else {
      this.cotizacionForm.markAllAsTouched();
      this._toast.showErrorToast('Se debe agregar al menos un producto')
    }
  }

  goBack() {
    this.router.navigate(['/cotizaciones']);
  }
}

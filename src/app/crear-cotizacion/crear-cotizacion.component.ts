import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProductosService } from '../services/productos.service';
import { ClientesService } from '../services/clientes.service';
import { ICrearCotizacion } from '../interfaces/cotizaciones.interface';
import { Router } from '@angular/router';
import { IProducto } from '../interfaces/productos.interface';
import { ICliente } from '../interfaces/clientes.interface';
import { ToastService } from '../services/toast.service';
import { CotizacionesService } from '../services/cotizaciones.service';

@Component({
  selector: 'app-crear-cotizacion',
  templateUrl: './crear-cotizacion.component.html',
  styleUrls: ['./crear-cotizacion.component.css']
})
export class CrearCotizacionComponent {
  cotizacionForm!: FormGroup;
  productos: IProducto[] = []
  clientes: ICliente[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private clientesService: ClientesService,
    private _toast:ToastService,
    private _cotizacionesService:CotizacionesService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.setupDetallesListener();
    this.getClients()
    this.getProducts()
    this.addDetalle();
  }

  initForm() {
    this.cotizacionForm = this.fb.group({
      clienteId: ['', Validators.required],
      estado: [{ value: 'pendiente', disabled: true }],
      subtotal: [{ value: 0, disabled: true }],
      iva: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      detalles: this.fb.array([])
    });
  }

  getClients() {
    this.clientesService.getClients().subscribe(res => {
      this.clientes = res
    })
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

  productChange(i:number){
    const formProduct = this.detalles.controls[i]
    const productValues = formProduct.value
    const selectedProduct = this.productos.find(product => product.id?.toString() === productValues.productoId);
    if(selectedProduct){
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
    if (this.cotizacionForm.valid && this.detalles.length>0) {
      const formValues = this.cotizacionForm.getRawValue();
      const budget = {
        cotizacion:{
          ...formValues,
        },
        detalles:[
          ...formValues.detalles
        ]
      }
      delete budget.cotizacion.iva
      delete budget.cotizacion.detalles
      this._cotizacionesService.createBudget(budget).subscribe(res=>{
        this._toast.showSuccessToast('Cotización creada exitosamente')
        this.router.navigate(['cotizaciones/editar',res.id]);
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

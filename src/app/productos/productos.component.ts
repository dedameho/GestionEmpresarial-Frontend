import { Component, OnInit } from '@angular/core';
import { IProducto } from '../interfaces/productos.interface';
import { HttpParams } from '@angular/common/http';
import { ProductosService } from '../services/productos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { ToastService } from '../services/toast.service';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  data: IProducto[] = [];

  columns = [
    { key: 'codigo', title: 'Código' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'precio', title: 'Precio' },
    { key: 'stock', title: 'Stock' }
  ];

  contextMenuItems = [
    { label: 'Editar', action: (row: any) => this.editProduct(row), icon: 'fa-edit', visible: (row: any) => true },
    { label: 'Eliminar', action: (row: any) => this.deleteProduct(row), icon: 'fa-trash text-orange-500', visible: (row: any) => true }
  ];

  filterForm!: FormGroup;

  constructor(
    private _productosService: ProductosService,
    private fb: FormBuilder,
    private _dialog:MatDialog,
    private _toast:ToastService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.filterForm.valueChanges.pipe(
      debounceTime(300)  // Espera 300 ms después de que el usuario deja de escribir
    ).subscribe(() => {
      this.onSubmit();
    });
    this.getProducts()
  }

  initForm() {
    this.filterForm = this.fb.group({
      nombre: [''],
      codigo: ['']
    })
  }

  getProducts(queryParams?: HttpParams) {
    this._productosService.getProducts(queryParams).subscribe(res => {
      this.data = res
    })
  }
  onSubmit() {
    const filters = this.filterForm.value;
    this.getProducts(filters)
  }

  createProductDialog(){
    const dialog = this._dialog.open(CrearProductoComponent,{
      width:'60vw'
    })
    dialog.afterClosed().subscribe(result=>{
      if(result){
        this._toast.showSuccessToast('Producto creado exitosamente')
        this.onSubmit()
      }
    })
  }

  editProduct(row:any){
    const dialog = this._dialog.open(EditarProductoComponent,{
      width:'60vw',
      data:row
    })
    dialog.afterClosed().subscribe(result=>{
      if(result){
        this._toast.showSuccessToast('Producto editado exitosamente')
        this.onSubmit()
      }
    })
  }

  deleteProduct(row:any){
    const dialog = this._dialog.open(ConfirmComponent)
    dialog.afterClosed().subscribe(result=>{
      if(result){
        this._productosService.deleteProduct(row.id).subscribe(res=>{
          this._toast.showSuccessToast('Producto eliminado exitosamente')
          this.onSubmit()
        })
      }
    })
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public productData: any,
    private fb: FormBuilder,
    private _dialog: MatDialogRef<CrearProductoComponent>,
    private _productosService: ProductosService
  ) {

  }

  ngOnInit(): void {
    this.initForm()
    this.productForm.patchValue(this.productData)
  }

  initForm() {
    this.productForm = this.fb.group({
      codigo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion: new FormControl('', Validators.maxLength(255)),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  onSubmit() {
    const newProductData = this.productForm.value
    this._productosService.editProduct(newProductData, this.productData.id).subscribe(res => {
      this.close(true)
    })
  }

  close(result: boolean) {
    this._dialog.close(result)
  }
}

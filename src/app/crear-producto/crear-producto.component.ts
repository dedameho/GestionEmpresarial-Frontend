import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _dialog:MatDialogRef<CrearProductoComponent>,
    private _productosService:ProductosService
    ) {

  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.productForm = this.fb.group({
      codigo: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion: new FormControl('', Validators.maxLength(255)),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  onSubmit() {
    const productData = this.productForm.value
    this._productosService.createProduct(productData).subscribe(res=>{
      this.close(true)
    })
  }

  close(result:boolean) {
    this._dialog.close(result)
  }

}

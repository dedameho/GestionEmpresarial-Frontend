import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { ClientesService } from '../services/clientes.service';
import { ICliente } from '../interfaces/clientes.interface';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public clientData: any,
    private fb: FormBuilder,
    private _clientesService:ClientesService,
    private _dialog:MatDialogRef<CrearClienteComponent>
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.clientForm.patchValue(this.clientData)
  }

  initForm() {
    this.clientForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      nit: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      ciudad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      telefono: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.email, Validators.maxLength(50)])
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const newClientData = this.clientForm.value
      this._clientesService.editClient(newClientData,this.clientData.id).subscribe(res=>{
        this.close(true)
      })
    }
  }

  close(result:boolean){
    this._dialog.close(result)
  }
}

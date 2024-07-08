import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _clientesService:ClientesService,
    private _dialog:MatDialogRef<CrearClienteComponent>
  ) {}

  ngOnInit(): void {
    this.initForm()
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
      const clientData = this.clientForm.value
      this._clientesService.createClient(clientData).subscribe(res=>{
        this.close(true)
      })
    }
  }

  close(result:boolean){
    this._dialog.close(result)
  }

}

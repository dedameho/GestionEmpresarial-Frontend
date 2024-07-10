import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { ICliente } from '../interfaces/clientes.interface';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { ToastService } from '../services/toast.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  data: ICliente[] = [];

  columns = [
    { key: 'nombre', title: 'Nombre' },
    { key: 'nit', title: 'NIT' },
    { key: 'direccion', title: 'Dirección' },
    { key: 'ciudad', title: 'Ciudad' },
    { key: 'telefono', title: 'Teléfono' }
  ];

  filterForm!: FormGroup;

  constructor(
    private _clientesService: ClientesService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    private _toast:ToastService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.filterForm.valueChanges.pipe(
      debounceTime(300)  // Espera 300 ms después de que el usuario deja de escribir
    ).subscribe(() => {
      this.onSubmit();
    });
    this.getClients()
  }

  getClients(queryParams?: HttpParams) {
    this._clientesService.getClients(queryParams).subscribe(res => {
      this.data = res;
    })
  }

  initForm() {
    this.filterForm = this.fb.group({
      nombre: [''],
      nit: [''],
      ciudad: ['']
    });
  }

  onSubmit() {
    const formValues = this.filterForm.value;
    this.getClients(formValues)
  }

  contextMenuItems = [
    { label: 'Editar', action: (row: any) => this.editClient(row), icon: 'fa-edit', visible: (row: any) => true },
    { label: 'Eliminar', action: (row: any) => this.deleteClient(row), icon: 'fa-trash text-orange-500', visible: (row: any) => true }
  ];


  editClient(row: any) {
    const dialog = this._dialog.open(EditarClienteComponent,{
      width:'60vw',
      data:row
    })
    dialog.afterClosed().subscribe(result => {
      if(result){
        this._toast.showSuccessToast('Cliente editado exitosamente')
        this.onSubmit()
      }
    })
  }

  deleteClient(row: any) {
    const dialog = this._dialog.open(ConfirmComponent)
    dialog.afterClosed().subscribe(result => {
      if(result){
        this._clientesService.deleteClient(row.id).subscribe(res=>{
          this._toast.showSuccessToast('Cliente eliminado exitosamente')
          this.onSubmit()
        })
      }
    })
  }

  createClientDialog() {
    const dialog = this._dialog.open(CrearClienteComponent, {
      width: '60vw'
    })
    dialog.afterClosed().subscribe(result => {
      if(result){
        this._toast.showSuccessToast('Cliente registrado exitosamente')
        this.onSubmit()
      }
    })
  }
}

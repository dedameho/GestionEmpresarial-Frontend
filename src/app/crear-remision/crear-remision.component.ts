import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RemisionesService } from '../services/remisiones.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../services/toast.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-crear-remision',
  templateUrl: './crear-remision.component.html',
  styleUrls: ['./crear-remision.component.css']
})
export class CrearRemisionComponent implements OnInit {

  remisionForm!:FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public cotizacionId: number,
    private _form:FormBuilder,
    private _remisionesService:RemisionesService,
    private _dialog:MatDialogRef<CrearRemisionComponent>,
    private _toast:ToastService
  ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.remisionForm = this._form.group({
      cotizacionId:new FormControl(this.cotizacionId,[Validators.required]),
      ordenCompra:new FormControl('',[Validators.required])
    })
  }

  close(result:boolean){
    this._dialog.close(result)
  }

  onSubmit(){
    const remisionData = this.remisionForm.value
    this._remisionesService.createRemision(remisionData).subscribe(res=>{
      this._dialog.close(true)
      this._toast.showSuccessToast('Remision creada con exito')
      window.open(`${environment.apiURL}/remision/${res.codigo}/pdf`)
    })
  }
}

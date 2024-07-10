import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _dialog:MatDialogRef<ConfirmComponent>
  ) { }

  ngOnInit(): void {
  }

  confirm(){
    this._dialog.close(true)
  }

  close(){
    this._dialog.close(false)
  }
}

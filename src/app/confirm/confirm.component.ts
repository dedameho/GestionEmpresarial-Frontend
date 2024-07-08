import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(
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

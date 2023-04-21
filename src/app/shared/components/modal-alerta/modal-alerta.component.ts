import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { DialogData } from 'src/app/auth/register/register.component';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.scss']
})
export class ModalAlertaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

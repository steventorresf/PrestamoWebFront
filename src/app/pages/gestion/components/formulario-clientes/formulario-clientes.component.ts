import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteApiService } from 'src/app/services/apis/cliente.service';
import { TablaDetalleApiService } from 'src/app/services/apis/tablaDetalle.service';

@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.scss']
})
export class FormularioClientesComponent implements OnInit {

  Id = 0;
  codigosTablas: string = '5,1,6';
  listTiposId: any[] = [];
  listGenero: any[] = [];
  listEstados: any[] = [];

  myForm: FormGroup = this._formBuilder.group({
    tipoId: [null, Validators.required],
    identificacion: [null, Validators.required],
    nombreCompleto: [null, Validators.required],
    generoId: [null, Validators.required],
    telCel: [null, Validators.required],
    direccion: [null, Validators.required],
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<FormularioClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _clienteApiService: ClienteApiService,
    private _tabñaDetalleApiService: TablaDetalleApiService,
  ) { }

  ngOnInit() {
    this.Id = this.data.id;
    if (this.data.id > 0 && this.data.element) {
      const element = this.data.element;
      this.myForm.patchValue({
        tipoId: element.tipoId,
        identificacion: element.identificacion,
        nombreCompleto: element.nombreCompleto,
        generoId: element.generoId,
        telCel: element.telCel,
        direccion: element.direccion,
      })
    }
    this.getTablasDetallePorCodigos();
  }

  getTablasDetallePorCodigos() {
    this._tabñaDetalleApiService.getTablasDetallePorCodigos(this.codigosTablas).subscribe(resp => {
      const data = resp.data;
      data.forEach((element: any) => {
        if (element.tablaId === 5) {
          this.listTiposId = element.listado;
          if(this.data.id === 0 && this.listTiposId.length > 0){
            this.myForm.get('tipoId')?.setValue(this.listTiposId[0].tablaDetalleId);
          }
        } else if (element.tablaId === 1) {
          this.listGenero = element.listado;
        } else if (element.tablaId === 6) {
          this.listEstados = element.listado;
        }
      });
    })
  }

  guardar() {
    const payload = {
      clienteId: this.Id,
      tipoId: this.myForm.get('tipoId')?.value,
      identificacion: this.myForm.get('identificacion')?.value,
      nombreCompleto: this.myForm.get('nombreCompleto')?.value,
      generoId: this.myForm.get('generoId')?.value,
      telCel: this.myForm.get('telCel')?.value,
      direccion: this.myForm.get('direccion')?.value
    }

    this._clienteApiService.postCliente(payload).subscribe(resp => {
      if (resp.success) {
        this._dialogRef.close({ refresh: true });
      }
    })
  }

  close() {
    this._dialogRef.close();
  }

}

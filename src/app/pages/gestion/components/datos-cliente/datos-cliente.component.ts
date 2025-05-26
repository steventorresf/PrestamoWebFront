import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteApiService } from 'src/app/services/apis/cliente.service';
import { TablaDetalleApiService } from 'src/app/services/apis/tablaDetalle.service';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.scss']
})
export class DatosClienteComponent {

  @Input() datosCliente: any = {};

}

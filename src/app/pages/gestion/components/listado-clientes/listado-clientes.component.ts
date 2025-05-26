import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteApiService } from 'src/app/services/apis/cliente.service';
import { FormularioClientesComponent } from '../formulario-clientes/formulario-clientes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {

  @Output() eventVerPrestamos = new EventEmitter<any>();

  formBusqueda: FormGroup = this._formBuilder.group({
    textoFiltro: ['']
  })

  ListadoDeClientes: any[] = [];
  FiltradoDeClientes: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
    private _clienteApiService: ClienteApiService
  ) { }

  ngOnInit() {
    this.obtenerClientesActivos();
  }

  filtrarListado() {
    this.FiltradoDeClientes = this.ListadoDeClientes.filter((item) => {
      return item.nombreCompleto.toLowerCase().includes(this.formBusqueda.get('textoFiltro')?.value.toLowerCase());
    })
  }

  abrirFormulario(element: any) {
    this._matDialog.open(FormularioClientesComponent, {
          disableClose: true,
          width: '40%',
          maxHeight: '98%',
          data: { id: element ? element.clienteId : 0, element }
        }).afterClosed().subscribe(data => {
          if (data?.refresh) {
            this.obtenerClientesActivos();
          }
        });
  }

  obtenerClientesActivos() {
    this._clienteApiService.obtenerClientesActivosporUsuario().subscribe(resp => {
      this.ListadoDeClientes = resp.data;
      this.FiltradoDeClientes = this.ListadoDeClientes.filter((item) => {
        return item.nombreCompleto.includes(this.formBusqueda.get('textoFiltro')?.value);
      })
    })
  }

  verPrestamos(element: any) {
    this.eventVerPrestamos.emit(element);
  }
}

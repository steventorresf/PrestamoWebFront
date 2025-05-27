import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormularioClientesComponent } from '../formulario-clientes/formulario-clientes.component';
import { MatDialog } from '@angular/material/dialog';
import { PrestamoApiService } from 'src/app/services/apis/prestamo.service';
import { FormularioPrestamosComponent } from '../formulario-prestamos/formulario-prestamos.component';
import { PonerPuntos } from 'src/app/utilities/Metodos';

@Component({
  selector: 'app-listado-prestamos',
  templateUrl: './listado-prestamos.component.html',
  styleUrls: ['./listado-prestamos.component.scss']
})
export class ListadoPrestamosComponent implements OnChanges {

  @Input() clienteId: number = 0;
  @Output() eventVerPrestamos = new EventEmitter<any>();

  CODIGO_ESTADO_PENDIENTE = 'PE';
  ListadoDePrestamos: any[] = [];

  PonerPuntos = PonerPuntos;

  constructor(
    private _matDialog: MatDialog,
    private _prestamoApiService: PrestamoApiService
  ) { }

  ngOnChanges() {
    this.obtenerPrestamos();
  }

  abrirFormulario(element: any) {
    this._matDialog.open(FormularioPrestamosComponent, {
      disableClose: true,
      width: '90%',
      maxHeight: '98vh',
      data: { id: element ? element.prestamoId : 0, element, clienteId: this.clienteId }
    }).afterClosed().subscribe(data => {
      if (data?.refresh) {
        this.obtenerPrestamos();
      }
    });
  }

  obtenerPrestamos() {
    this.ListadoDePrestamos = [];
    if (this.clienteId > 0) {
      this._prestamoApiService.ObtenerPrestamosPorClienteId(this.clienteId).subscribe(resp => {
        this.ListadoDePrestamos = resp.data;
      })
    }
  }

  anularPrestamo(element: any) {
    this.eventVerPrestamos.emit(element);
  }
}

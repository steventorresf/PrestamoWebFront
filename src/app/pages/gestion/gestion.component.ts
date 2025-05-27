import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {

  ocultar = {
    listadoClientes: false,
    datosCliente: true,
    listadoPrestamos: true,
    formularioPrestamo: true
  }
  datosCliente: any = {}

  constructor(

  ) { }

  ngOnInit() {
  }

  regresarAListadoClientes(){
    this.ocultar.formularioPrestamo = true;
    this.ocultar.listadoPrestamos = true;
    this.ocultar.datosCliente = true;
    this.ocultar.listadoClientes = false;
    this.datosCliente = {};
  }

  eventVerPrestamos(element: any) {
    this.datosCliente = { ...element };
    this.ocultar.listadoClientes = true;
    this.ocultar.datosCliente = false;
    this.ocultar.listadoPrestamos = false;
  }

}

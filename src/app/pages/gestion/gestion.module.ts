import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GestionComponent } from './gestion.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { FormularioClientesComponent } from './components/formulario-clientes/formulario-clientes.component';
import { DatosClienteComponent } from './components/datos-cliente/datos-cliente.component';
import { ListadoPrestamosComponent } from './components/listado-prestamos/listado-prestamos.component';
import { FormularioPrestamosComponent } from './components/formulario-prestamos/formulario-prestamos.component';

@NgModule({
	declarations: [
		GestionComponent,
		ListadoClientesComponent,
		FormularioClientesComponent,
		DatosClienteComponent,
		ListadoPrestamosComponent,
		FormularioPrestamosComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule
	]
})
export class GestionModule { }

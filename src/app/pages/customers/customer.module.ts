import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { TableClientComponent } from './components/table/table.component';
import { EditorClientComponent } from './components/editor/editor.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		CustomerComponent,
		TableClientComponent,
		EditorClientComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule
	]
})
export class CustomerModule { }

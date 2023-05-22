import { NgModule } from '@angular/core';
import { TableLoanComponent } from './components/table/table.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoanComponent } from '../loans/loan.component';

@NgModule({
	declarations: [
		LoanComponent,
		TableLoanComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule
	]
})
export class LoanModule { }

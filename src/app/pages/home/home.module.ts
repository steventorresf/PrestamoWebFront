import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerModule } from '../customers/customer.module';
import { MaterialModule } from 'src/app/material.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		MaterialModule,
		HomeRoutingModule,
		CustomerModule
	]
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CustomerComponent } from '../customers/customer.component';
import { HomeChildGuard } from 'src/app/guards/home-child-guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivateChild: [HomeChildGuard],
		children: [
			{
				path: 'customers',
				component: CustomerComponent,
				loadChildren: () => import('../customers/customer.module').then((m) => m.CustomerModule)
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {}

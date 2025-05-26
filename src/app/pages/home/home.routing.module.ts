import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeChildGuard } from 'src/app/guards/home-child-guard';
import { GestionComponent } from '../gestion/gestion.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivateChild: [HomeChildGuard],
		children: [
			{
				path: 'gestion',
				component: GestionComponent,
				loadChildren: () => import('../gestion/gestion.module').then((m) => m.GestionModule)
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {}

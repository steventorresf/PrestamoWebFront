import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlSegment } from "@angular/router";
import { SwalService } from "../services/swal.service";

@Injectable({
	providedIn: 'root'
})
export class HomeChildGuard implements CanActivateChild {
	constructor(
		private _router: Router,
		private _swalService: SwalService
	) { }

	async canActivateChild(childRoute: ActivatedRouteSnapshot): Promise<boolean> {
		return await this.accesPath(childRoute.url);
	}

	private async accesPath(url: UrlSegment[]): Promise<boolean> {
		console.log(url);
		const canAccess = false;
		if (!canAccess) {
			await this._swalService.infoError('Sin acceso', 'Usted no tiene acceso a este modulo', null);
			this._router.navigateByUrl('')
				.then(() => {
					window.location.reload();
				})
		}
		return canAccess;
	}
}

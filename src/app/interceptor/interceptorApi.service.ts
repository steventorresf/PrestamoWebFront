import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, Observable, catchError, map } from "rxjs";
import { JwtService } from "../services/jwt.service";
import { SwalService } from "../services/swal.service";
import { LoadingService } from "../services/loading.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        private _jwtApiService: JwtService,
        private _swalService: SwalService,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let requestClone = req;

        if (this._router.url !== '/login') {
            if (!this._jwtApiService.isLoggedIn()) {
                this._swalService.infoError('¡Sesión expirada!', 'Su sesión ha expirado, por favor ingrese nuevamente.', () => {
                    void this._router.navigateByUrl('login')
                    .then(() => {
                        window.location.reload();
                      });
                })
                return EMPTY;
            }
            const token = this._jwtApiService.getToken();
            requestClone = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token!}`)
            });
        }

        this._loadingService.setLoading(true, requestClone.url);
        return next.handle(requestClone)
        .pipe(catchError((err) => {
            this._loadingService.setLoading(false, requestClone.url);
            return err;
          }))
          .pipe(map<unknown, any>((evt) => {
            if (evt instanceof HttpResponse) {
              this._loadingService.setLoading(false, requestClone.url);
            }
            return evt;
          }));;
    }

}
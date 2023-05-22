import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SwalService } from "./swal.service";

const URL_LOGIN = `${environment.ApiUrl}Usuario/login`;

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    constructor(
        private _httpClient: HttpClient,
        private _swalService: SwalService,
        private _router: Router
    ) { }

    login_api(data: any): Observable<any> {
        return this._httpClient.post<any>(URL_LOGIN, data);
    }

    login(data: any) {
        this.login_api(data).subscribe(res => {
            if (!res.success) {
              this._swalService.infoError('Error', res.message, null);
              return;
            }
    
            sessionStorage.setItem('user', JSON.stringify({
              usuarioId: res.data.usuarioId,
              nombreCompleto: res.data.nombreCompleto,
              nombreUsuario: res.data.nombreUsuario,
              avatar: res.data.avatar,
              fechaExpiracion: res.data.fechaExpiracion
            }));
            sessionStorage.setItem('token', res.data.token);
    
            this._router.navigateByUrl('')
              .then(() => {
                window.location.reload();
              });
          });
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
        this._router.navigateByUrl('/login')
            .then(() => {
                window.location.reload();
            })
    }
}
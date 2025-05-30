import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL = `${environment.ApiUrl}clientes/`;

@Injectable({
    providedIn: 'root'
})
export class ClienteApiService {

    constructor(private http: HttpClient) { }

    // List
    public obtenerClientesActivosporUsuario(): Observable<any> {
        return this.http.get<any>(`${URL}obtener-clientes-por-usuario?estado=AC`)
            .pipe(
                retry(2), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    public postCliente(payload: any): Observable<any> {
        return this.http.post<any>(`${URL}guardar-cliente`, payload)
            .pipe(
                retry(2), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );

    }

    // public put_Trayectos(param: any): Observable<dataresult> {
    //     param.auditoria = this.buildAudit('Actualizar');
    //     return this.http.put<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectos/ActualizarTrayectos`, param)
    //         .pipe(
    //             retry(2), // retry a failed request up to 3 times
    //             catchError(this.handleError) // then handle the error
    //         );

    // }

    // public del_Trayectos(id: any): Observable<dataresult> {
    //     return this.http.delete<dataresult>(`${environment.apiURI_Acceso}TrayectosTrayectos/EliminarTrayectos?TrayectoId=${id}`)
    //         .pipe(
    //             retry(2), // retry a failed request up to 3 times
    //             catchError(this.handleError) // then handle the error
    //         );

    // }

    // Errors
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

}
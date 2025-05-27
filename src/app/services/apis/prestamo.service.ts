import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL = `${environment.ApiUrl}prestamos/`;
@Injectable({
    providedIn: 'root'
})
export class PrestamoApiService {

    constructor(private http: HttpClient) { }

    // List
    public ObtenerPrestamosPorClienteId(clienteId: number): Observable<any> {
        return this.http.get<any>(`${URL}obtener-prestamos-por-cliente-id/${clienteId}`)
            .pipe(
                retry(2), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    public CalcularCuotasPrestamo(payload: any): Observable<any> {
        return this.http.post<any>(`${URL}calcular-cuotas-prestamo`, payload)
            .pipe(
                retry(2), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );

    }

    public CrearPrestamo(payload: any): Observable<any> {
        return this.http.post<any>(`${URL}crear-prestamo`, payload)
            .pipe(
                retry(2), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );

    }

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
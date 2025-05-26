import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL = `${environment.ApiUrl}tabla-detalle/`;

@Injectable({
    providedIn: 'root'
})
export class TablaDetalleApiService {

    constructor(private http: HttpClient) { }

    // List
    public getTablasDetallePorCodigos(codigos: string): Observable<any> {
        return this.http.get<any>(`${URL}obtener-tablas-detalles-por-codigos?codigos=${codigos}`)
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
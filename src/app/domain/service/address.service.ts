import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AddressType } from '../model/address.type'
import { Injectable } from '@angular/core';

const apiUrl = 'http://viacep.com.br/ws'

@Injectable()
export class AddressService{
    constructor(private http: HttpClient) { }

    getAddressByZipCode(zipcode: string): Observable<AddressType> {
        const url = `${apiUrl}/${zipcode}/json`;
        return this.http.get<AddressType>(url).pipe(
          tap(_ => console.log(`consulta cep =${zipcode}`)),
          catchError(this.handleError<AddressType>(`query Zipcode "${zipcode}"`))
        );
      }

      handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          return of(result as T);
        };
      }

}
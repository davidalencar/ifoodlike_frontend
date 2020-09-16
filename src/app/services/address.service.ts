import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GeoDataType } from './types/geodata.type'
import { AddressType } from './types/address.type'
import { add } from 'lodash';

const apiUrl = 'https://viacep.com.br/ws'
const geoApiUrl = 'https://nominatim.openstreetmap.org/search/?';

@Injectable()
export class AddressService {
  constructor(private http: HttpClient) { }

  getAddressByZipCode(zipcode: string): Observable<AddressType> {
    const url = `${apiUrl}/${zipcode}/json`;
    return this.http.get<AddressType>(url);
  }

  fillGeoData(address: AddressType) {
    const url = `${geoApiUrl}street=${address.logradouro} ${address.numero}&city=${address.localidade}&state=${address.uf}&format=json`;
    this.http.get<GeoDataType[]>(url).subscribe((geoData: GeoDataType[]) => {      
      if(geoData.length > 0) {
        address.lon = geoData[0].lon;
        address.lat = geoData[0].lat;
      }
    })
  }

  
}
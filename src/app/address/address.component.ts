import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { AddressType } from '../services/types/address.type';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './address.component.css'],
  providers: [AddressService]
})
export class AddressComponent implements OnInit {
  
  zipCodeQueryError = ''

  constructor(public addressService: AddressService, public storeService: StoreService) { }

  ngOnInit(): void {
  }

  onZipCodeChange(value: string) {
    this.zipCodeQueryError = '';

    if (value.length == 8) {
      this.addressService.getAddressByZipCode(value).subscribe(
        (data: AddressType) => {
          if (data.erro == true) {
            this.zipCodeQueryError = 'CEP não cadastrado!'
            return;
          }

          this.storeService.order.address = data;
        }
      );
    }
  }

  formatAddress() {
    if (!this.storeService.order.address) return '';

    var ads =  this.storeService.order.address;
    return `${ads.bairro}, ${ads.localidade}/${ads.uf}`
  }

}

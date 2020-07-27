import { Component, OnInit } from '@angular/core';
import { StoreService } from '../domain/service/store.service';
import { AddressService } from '../domain/service/address.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  './bill.component.css'],
  providers: [AddressService]
})
export class BillComponent implements OnInit {

  zipCode = '';

  constructor(public storeService: StoreService,
    public addressService: AddressService) { }

  ngOnInit(): void {
  }

  onQueryZipCode () {
    console.log('cep: ' + this.zipCode)
    this.addressService.getAddressByZipCode(this.zipCode).subscribe(data => console.log(data));
  }

  onConfirmPurch(form: NgForm){
    console.log(form)
  }
}

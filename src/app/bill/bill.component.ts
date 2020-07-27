import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../domain/service/store.service';
import { AddressService } from '../domain/service/address.service'
import { AddressType } from '../domain/model/address.type'
import { NgForm } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  './bill.component.css'],
  providers: [AddressService]
})
export class BillComponent implements OnInit {
  @ViewChild('form') custData: NgForm;

  zipCodeQueryError = ''

  constructor(public storeService: StoreService,
    public addressService: AddressService) { }

  ngOnInit(): void {
  }

  onZipCodeChange (value: string, form: NgForm) {
    this.zipCodeQueryError = '';
    
    if(value.length == 8){
      this.addressService.getAddressByZipCode(value).subscribe(
        (data:AddressType) =>{
          console.log(data)
          if (data.erro == true){
            this.zipCodeQueryError = 'CEP não cadastrado!'
          }
          form.controls['userAddress'].setValue(data.logradouro)
          form.controls['userAddressLine'].setValue(`${data.localidade}/${data.uf}`)
        }
      );
    }
  }

  
  

  onConfirmPurch(){
    console.log(this.custData)
  }
}

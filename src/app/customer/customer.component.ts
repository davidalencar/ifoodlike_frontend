import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../domain/service/store.service';
import { AddressService } from '../domain/service/address.service'
import { AddressType } from '../domain/model/address.type'
import { NgForm } from '@angular/forms'
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  './customer.component.css'],
  providers: [AddressService]
})
export class CustomerComponent implements OnInit {
 
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
            return;
          }
          form.controls['userAddress'].setValue(data.logradouro)
          form.controls['userAddressLine'].setValue(`${data.localidade}/${data.uf}`)
        }
      );
    }
  }

  onConfirmPurch(){    
    window.location.href = `https://api.whatsapp.com/send?phone=${this.storeService.store.phone}&text=${window.encodeURIComponent(this.formatData())}`
  }

  formatData(){
    return `*${this.custData.value.userName.trim()}*\n${this.formatAddress()}\n\n${this.formatOrder()}`
  }

  formatAddress(){
    return `Endereço: ${this.custData.value.userAddress},${this.custData.value.userAddressNumber} - ${this.custData.value.userAddressLine} - CEP: ${this.custData.value.zipcode}`
  }

  formatOrder(){
    var order: string = 'Pedido:';

    this.storeService.basketProducts().forEach(p => order+= `    \n ${p.qty} ${p.unit} ${p.name} (${this.storeService.formatPrice(p.price)})`)

    this.storeService.store.taxes.forEach( t=> order+= `    \n _(${t.name} ${this.storeService.formatPrice(t.value)})_`)
    order+= `\n\n*Total ${this.storeService.formatPrice(this.storeService.basketTotalAmountWithTaxes())}*`

    return order;
  }

}

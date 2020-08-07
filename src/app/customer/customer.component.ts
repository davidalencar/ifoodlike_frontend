import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../services/store.service';
import { AddressService } from '../services/address.service';
import { AddressType } from '../services/types/address.type';
import { NgForm } from '@angular/forms';

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
    return `Endereço: ${this.custData.value.userAddress}, ${this.custData.value.userAddressNumber} - ${this.custData.value.userAddressLine} - CEP: ${this.custData.value.zipcode}\n${this.custData.value.userAddressComplement}`
  }

  formatOrder(){
    var order: string = 'Pedido:';

    this.storeService.basketProducts().forEach(p => order+= `    \n ${p.qty} _${p.unit.trim()}_ ${p.name} (${this.storeService.formatPrice(p.price * p.qty)})`)
    order+='\n'
    this.storeService.store.taxes.forEach( t=> order+= `    \n _(${t.name} ${this.storeService.formatPrice(t.value)})_`)
    order+= `\n\n*Total ${this.storeService.formatPrice(this.storeService.basketTotalAmountWithTaxes())}*`

    return order;
  }

}

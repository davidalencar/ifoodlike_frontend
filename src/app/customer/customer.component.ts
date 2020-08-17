import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../services/store.service';
import { AddressService } from '../services/address.service';
import { AddressType } from '../services/types/address.type';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

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
    const apiURI = 'https://api.whatsapp.com/send?'
    const argPhone = (this.storeService.store.phone) ? `phone=${this.storeService.store.phone}` : ''     
    const argsOrder = `&text=${window.encodeURIComponent(this.formatData())}` 
    window.location.href = `${apiURI}${argPhone}${argsOrder}`
  }

  
  breakLine() {
    return '\n\n---\n\n'
  }

  formatData(){
    var data:string = '';
   
    data+= this.formatUserInfo();
    data+= this.breakLine();
    data+= `*Pedido:* \n${this.formatOrder()}`;
    if (this.storeService.store.questions.address == true) {
      data+= this.breakLine();
      data+= `*Endereço:* \n${this.formatAddress()}`
    }
    data+= this.breakLine();
    data+= `*Forma de pagamento:* \n${this.formatPaym()}`;
    data+= this.breakLine();
    data+= this.formatFooter()

    return data;
  }

  formatPaym(){
    var paym: string = '\n' 

    switch (this.custData.value.paym) {
      case 'transfer':
        paym+='Transferência\n'
        paym+=`*Banco:* ${this.storeService.store.paym.transfer.bank}\n`
        paym+=`*Conta:* ${this.storeService.store.paym.transfer.account}\n`
        paym+=`*Documento:* ${this.storeService.store.paym.transfer.document}`
        break;
      case 'money':
        paym+='Dinheiro'
        break;
      case 'credit':
        paym+='Cartão de crédito'
        break;
    }

    return paym;
  }

  formatUserInfo() {
    var userInfo: string = `*${this.custData.value.userName.trim()}*`
    if (this.storeService.store.questions.phone == true){ 
      userInfo+= '\n';
      userInfo+= `${this.custData.value.userPhone}`
    }
    return userInfo;
  }

  formatAddress(){
    return `${this.custData.value.userAddress}, ${this.custData.value.userAddressNumber} - ${this.custData.value.userAddressLine} - CEP: ${this.custData.value.zipcode}\n${this.custData.value.userAddressComplement}`
  }

  formatOrder(){
    var order: string = '';

    this.storeService.basketProducts().forEach(p => {
       order+= `    \n ${p.qty}  _${p.unit.trim()}_  ${p.name}  (${this.storeService.formatPrice(p.price * p.qty)})`
       this.storeService.getItemsInProduct(p).forEach( item => {
          order+= `    \n     + ${item.qty * p.qty}  _${item.unit.trim()}_  ${item.name}  (${this.storeService.formatPrice(item.price * item.qty * p.qty)})`
       })
      })
    order+='\n'
    this.storeService.store.taxes.forEach( t=> order+= `    \n _(${t.name} ${this.storeService.formatPrice(t.value)})_`)
    order+= `\n\n*Total ${this.storeService.formatPrice(this.storeService.basketTotalAmountWithTaxes())}*`

    return order;
  }

  formatFooter() {
    var footer:string = '';
    footer+= `Pedido em ${moment().format('DD/MM/YYYY HH:mm')}`;
    footer+= ` via minha.bslista.com/${this.storeService.store.name}`;
    
    return  footer;
  }

}

import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { ProductType } from '../services/types/product.type';
import { CookieService } from 'ngx-cookie-service';

import * as moment from 'moment';

import { SalesResponseType } from '../services/types/sales.response.type';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css',
    './bill.component.css']
})
export class BillComponent implements OnInit {

  commandNow: string = 'confirm';

  constructor(public storeService: StoreService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getDataFromCookie();
  }

  getDataFromCookie() {

    if (this.cookieService.check('user-name') && this.storeService.order.userName == undefined) {
      this.storeService.order.userName = this.cookieService.get('user-name');
    }
    if (this.cookieService.check('user-phone') && this.storeService.order.userPhone == undefined) {      
      this.storeService.order.userPhone = this.cookieService.get('user-phone');
    }
    
    if (this.cookieService.check('user-address') && this.storeService.order.address.cep == undefined) {
      this.storeService.order.address = JSON.parse(this.cookieService.get('user-address'));       
    }
    if (this.cookieService.check('user-paym') && this.storeService.order.paymMethod == undefined) {
      this.storeService.order.paymMethod = this.cookieService.get('user-paym');
    }

  }

  setDataToCookie() {
    const expires = 14;

    if (this.storeService.order.userName != undefined) {
      this.cookieService.set('user-name', this.storeService.order.userName, expires);
    }
    if (this.storeService.order.userPhone != undefined) {
      this.cookieService.set('user-phone', this.storeService.order.userPhone, expires);
    }
    if (this.storeService.order.address.cep != undefined) {  
      this.cookieService.set('user-address', JSON.stringify(this.storeService.order.address), expires);
    }
    if (this.storeService.order.paymMethod != undefined) {
      this.cookieService.set('user-paym', this.storeService.order.paymMethod, expires);
    }

  }

  setPaymMethod(paymMethod: string) {
    this.storeService.order.paymMethod = paymMethod;
  }

  productRouterLink(p: ProductType) {
    if (p.items.length > 0) {
      return ['/', this.storeService.store.name, 'items']
    }

    return ['/', this.storeService.store.name]
  }

  onConfirmPurch() {
    this.commandNow = 'spinner';
    this.setDataToCookie();
    this.storeService.sendOrder()
    .subscribe((data: SalesResponseType)=> {
      this.storeService.salesId = data.salesId;
      this.commandNow = 'share';
  })
    
  }

  sendViaWhats() {
    const apiURI = 'https://api.whatsapp.com/send?'
    const argPhone = (this.storeService.store.phone) ? `phone=${this.storeService.store.phone}` : ''
    const argsOrder = `&text=${window.encodeURIComponent(this.formatData())}`
    window.location.href = `${apiURI}${argPhone}${argsOrder}`
  }

  breakLine() {
    return '\n\n---\n\n'
  }

  formatData() {
    var data: string = '';

    data+= this.formatHeader()
    data += this.breakLine();
    data += this.formatUserInfo();
    data += this.breakLine();
    data += `*Pedido:* \n${this.formatOrder()}`;
    if (this.storeService.store.questions.address == true) {
      data += this.breakLine();
      data += `*Endereço:* \n${this.formatAddress()}`
    }
    data += this.breakLine();
    data += `*Forma de pagamento:* \n${this.formatPaym()}`;
    if (this.storeService.order.instruction != undefined && this.storeService.order.instruction.trim().length > 0) {
      data += this.breakLine();
      data += `*Instruções:* \n${this.formatOrderInstructions()}`

    }


    data += this.breakLine();
    data += this.formatFooter()

    return data;
  }

  formatPaym() {
    var paym: string = '\n'

    switch (this.storeService.order.paymMethod) {
      case 'transfer':
        paym += 'Transferência\n'
        paym += `*Banco:* ${this.storeService.store.paym.transfer.bank}\n`
        paym += `*Conta:* ${this.storeService.store.paym.transfer.account}\n`
        paym += `*Documento:* ${this.storeService.store.paym.transfer.document}`
        break;
      case 'money':
        paym += 'Dinheiro'
        break;
      case 'credit':
        paym += 'Cartão de crédito'
        break;
    }

    return paym;
  }

  formatSalesId() {
    var orderFormated = String(this.storeService.salesId);
    return `#${orderFormated.padStart(4, '0')}`
  }

  formatHeader() {
    var header = `Pedido: ${this.formatSalesId()}`;
    
    return header;
  }

  formatUserInfo() {
    var userInfo: string = `*${this.storeService.order.userName.trim()}*`
    if (this.storeService.store.questions.phone == true) {
      userInfo += '\n';
      userInfo += `${this.storeService.order.userPhone}`
    }
    return userInfo;
  }

  formatAddress() {
    return `${this.storeService.formatAddressLine1()}\n${this.storeService.formatAddressLine2()}`
  }

  formatOrder() {
    var order: string = '';

    this.storeService.basketProducts().forEach(p => {
      order += `    \n ${p.qty}  _${p.unit.trim()}_  ${p.name}  (${this.storeService.formatPrice(p.price * p.qty)})`

      this.storeService.orderProductItemsCategory(p.items).forEach(category => {
        order += `\n  _${category.name}_`
        this.storeService.getItemsInProductItemCategory(category).forEach(item => {
          order += `    \n     + _${(item.qty > 1) ? item.qty + '  ' : ''}${item.name}${(item.price > 0) ? '  (' + this.storeService.formatPrice(item.price * item.qty * p.qty) + ')' : ''}_`
        })
      })
    })
    order += '\n'
    this.storeService.store.taxes.forEach(t => order += `    \n _(${t.name} ${this.storeService.formatPrice(t.value)})_`)
    order += `\n\n*Total ${this.storeService.formatPrice(this.storeService.basketTotalAmountWithTaxes())}*`

    return order;
  }

  formatOrderInstructions() {
    return `\n${this.storeService.order.instruction.trim()}`
  }

  formatFooter() {
    var footer: string = '';
    footer += `Pedido em ${moment().format('DD/MM/YYYY HH:mm')}`;
    footer += ` via minha.bslista.com/${this.storeService.store.name}`;

    return footer;
  }
}

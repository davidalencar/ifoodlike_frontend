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
    const expires = 60;

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
      .subscribe((data: SalesResponseType) => {
        this.storeService.salesId = data.salesId;
        //this.commandNow = 'share';
        this.sendViaWhats()
      })

  }

  sendViaWhats() {
    const apiURI = 'https://api.whatsapp.com/send?'
    const argPhone = (this.storeService.store.phone) ? `phone=55${this.storeService.store.phone}` : '';
    const argsOrder = `&text=${window.encodeURIComponent(this.formatData())}`;
    window.open(`${apiURI}${argPhone}${argsOrder}`)
    window.location.href = `/${this.storeService.store.name}`;
  }

  breakLine() {
    return '\n---\n'
  }

  formatData() {
    var data: string = '';

    data += this.formatHeader()
    data += this.breakLine();
    data += `_Itens_ \n${this.formatOrder()}`;
    if (this.storeService.store.questions.address == true) {
      data += this.breakLine();
      data += `*Endereço:* \n${this.formatAddress()}`
    }

    if (this.storeService.order.instruction != undefined && this.storeService.order.instruction.trim().length > 0) {
      data += this.breakLine();
      data += `*Instruções:* \n${this.formatOrderInstructions()}`

    }


    data += this.breakLine();
    data += this.formatFooter()

    return data;
  }

  formatPaym() {
    var paym: string = ''

    switch (this.storeService.order.paymMethod) {
      case 'transfer':
        paym += '_Transferência_\n'
        paym += `_Banco: ${this.storeService.store.paym.transfer.bank}_\n`
        paym += `_Conta: ${this.storeService.store.paym.transfer.account}_\n`
        paym += `_Documento: ${this.storeService.store.paym.transfer.document}_`
        break;
      case 'money':
        paym += '_Dinheiro_'
        break;
      case 'credit':
        paym += '_Cartão de crédito_'
        break;
    }

    return paym;
  }

  formatSalesId() {
    var orderFormated = String(this.storeService.salesId);
    return `#${orderFormated.padStart(4, '0')}`
  }

  formatHeader() {
    var header = `*${this.formatSalesId()}*`;
    header += `\n _${this.formatUserInfo()}_`;

    return header;
  }

  formatUserInfo() {
    var userInfo: string = `${this.storeService.order.userName.trim()}`
    if (this.storeService.store.questions.phone == true) {
      userInfo += ` - ${this.storeService.order.userPhone}`
    }
    return userInfo;
  }

  formatAddress() {
    return `${this.storeService.formatAddressLine1()}\n${this.storeService.formatAddressLine2()}`
  }

  formatOrder() {
    var order: string = '';

    this.storeService.basketProducts().forEach(p => {
      order += `    \n *${p.qty}X*  ${(p.unit == undefined) ? '' : '_' + p.unit + '_'}  *${p.name}*  _(${this.storeService.formatPrice(p.price * p.qty)})_`

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
    order += `\n_Pagamento:_ ${this.formatPaym()}`;

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

  scheduleOrder() {
    return this.storeService.getNextTime().workDay;
  }

  formatScheduleDate() {
    const date = this.storeService.getNextTime().date;

    if (date.diff(moment(), 'day') == 0) {
      return 'Hoje'
    }

    return `date.format('DD/MM')} (${this.storeService.weekDay(date.day()).toLocaleLowerCase()}`
  }
}

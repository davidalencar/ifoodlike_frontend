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
        this.storeService.setLastOrder();
        this.sendViaWhats()
      })

  }

  sendViaWhats() {
    const apiURI = 'https://api.whatsapp.com/send?'
    const argPhone = (this.storeService.store.phone) ? `phone=55${this.storeService.store.phone}` : '';
    const argsOrder = `&text=${window.encodeURIComponent(this.storeService.getOrderWhatsAppText())}`;
    window.open(`${apiURI}${argPhone}${argsOrder}`)
    window.location.href = `/order/${this.storeService.salesId}`;
  }



  scheduleOrder() {
    return this.storeService.getNextTime().workDay;
  }

  formatScheduleDate() {
    if (this.storeService.getNextTime() == undefined) return '';

    const date = this.storeService.getNextTime().date;

    if (date.diff(moment(), 'day') == 0) {
      return 'Hoje'
    }

    const dateFormat = date.format('DD/MM');
    const weekDayName = this.storeService.weekDay(date.day()).toLocaleLowerCase();

    return `${dateFormat} (${weekDayName})`
  }

  onSelectPeriod(h: { from: number, to: number }) {
    this.storeService.order.schedule = {
      date: this.storeService.getNextTime().date.toDate(),
      period: `${this.storeService.formatHour(h.from)} - ${this.storeService.formatHour(h.to)}`
    }
  }
}

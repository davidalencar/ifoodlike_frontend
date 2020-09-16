import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { DashBoardService } from '../services/dashboard.service';
import { StoreService } from '../services/store.service';
import { CustomerType } from '../services/types/customer.type';
import { SalesType } from '../services/types/sales.type';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css',
    './order.component.css']
})
export class OrderComponent implements OnInit {

  salesId: string = '';
  lastOrder: { customer: CustomerType, order: SalesType };

  constructor(public storeService: StoreService, private router: Router, private titleService: Title, public dashBoardService: DashBoardService) {
    this.lastOrder = this.storeService.getLastOrder();

    if (this.lastOrder == null || this.lastOrder == undefined) {
      router.navigate(['/']);
    }
    if  (this.storeService.store.name == undefined) {      
      this.storeService.getStoreData(this.lastOrder.order.store);
    }
    this.salesId = this.storeService.formatSalesId(this.lastOrder.order.salesId);
  }

  ngOnInit(): void {
  }


  talkViaWhats() {
    const apiURI = 'https://api.whatsapp.com/send?'
    const argPhone = `phone=55${this.storeService.store.phone}`
    const argsOrder = `&text=${window.encodeURIComponent(this.formatMsgToWhats())}`
    return `${apiURI}${argPhone}${argsOrder}`
  }

  formatMsgToWhats() {
    return `Oi, sou ${this.lastOrder.customer.name} e quero falar sobre o pedido ${this.salesId}`;
  }
}

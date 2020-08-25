import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


import { DashBoardService } from '../services/dashboard.service';
import { StoreService } from '../services/store.service';
import { SalesType } from '../services/types/sales.type'

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css',
    './sales.component.css']
})
export class SalesComponent implements OnInit {

  viewNow: string = 'sales'
  salesToShow = []
  sales: SalesType[] = [];
  groupItems: {
    conpose: any[],
    simple: any[]
  };

  items: {
    qty: number,
    products: string
  }[] = [];


  constructor(private route: ActivatedRoute, public storeService: StoreService, public dashBoardSevice: DashBoardService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {

      this.dashBoardSevice.getStoreSalesData(id)
        .subscribe(data => {
          this.sales = data.sales;

        }, (e: any) => {
          console.log(e)
        })

    });
  }

  convertToProductView() {
    const mapLine = this.sales.map(s => s.lines).reduce((a, b) => {
      a.push(...b);
      return a;
    });

    this.groupItems = {
      conpose: [],
      simple: []
    };


    const groups = _.groupBy(mapLine, 'product');
    Object.keys(groups).forEach(pg => {

      const conpose = groups[pg].filter(p => p.items.length > 0);
      if (conpose.length > 0) {
        this.groupItems.conpose = [...conpose, this.groupItems.conpose]
      } else {
        const p = groups[pg].reduce((a, b) => {
          a.qty + b.qty;
          return a;
        })
        this.groupItems.simple.push(p)
      }
    })

  }

  ordeByName(list: any[]) {
    return list.sort((a, b) => (a.product > b.product) ? 1 : ((b.product > a.product) ? -1 : 0))
  }

  ngOnInit(): void {
  }

  showSales(id: string) {
    if (this.salesToShow.includes(id)) {
      this.salesToShow = this.salesToShow.filter(i => i != id)
    } else {
      this.salesToShow.push(id)
    }
  }

  formatDate(date: Date) {
    return moment(date).format('DD/MM/YYYY HH:mm')
  }

  formatDeliveryAddressL1(s: SalesType) {
    const ad = s.cust.address;
    return `${ad.street}, ${ad.number}${(ad.complement) ? ' - ' + ad.complement : ''}`
  }

  formatDeliveryAddressL2(s: SalesType) {
    const ad = s.cust.address;
    return `CEP: ${ad.zipCode} - ${ad.district} - ${ad.city}/${ad.state}`
  }

  talkViaWhats(s: SalesType) {
    const apiURI = 'https://api.whatsapp.com/send?'
    const argPhone = `phone=55${s.cust.phone}`
    const argsOrder = `&text=${window.encodeURIComponent(this.formatMsgToWhats(s))}`
    return `${apiURI}${argPhone}${argsOrder}`
  }

  formatMsgToWhats(s: SalesType) {
    var msg = `Oi ${s.cust.name}, tudo bem?\n`
    msg += `Tem um minutinho para falar sobre o pedido ${this.storeService.formatSalesId(s.salesId)}?`
    return msg;
  }

  changeView(view: string) {
    this.viewNow = view;
    if (view == 'items') {
      this.convertToProductView();
    }
  }
}

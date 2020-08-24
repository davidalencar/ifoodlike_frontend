
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

  salesToShow = []
  sales: SalesType[] = [];

  constructor(private route: ActivatedRoute, public storeService: StoreService, public dashBoardSevice: DashBoardService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      
      this.dashBoardSevice.getStoreSalesData(id)      
          .subscribe(data => {
            this.sales = data.sales;
          }, (e: any) =>{
            console.log(e)
          })
      
    });    
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
    return `${ad.street}, ${ad.number}${(ad.complement) ? ' - ' + ad.complement: ''}`
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
    msg+= `Tem um minutinho para falar sobre o pedido ${this.storeService.formatSalesId(s.salesId)}?`
    return msg;
  }
}

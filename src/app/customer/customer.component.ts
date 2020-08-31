import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { DashBoardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { CustomerType } from '../services/types/customer.type';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './customer.component.css',
    '../../../node_modules/remixicon/fonts/remixicon.css']
})
export class CustomerComponent implements OnInit {

  commandNow: string = 'confirm';
  storeName = '';
  noCust = false;
  custs: CustomerType[] = [];
  custToShow: string[] = [];
  labels:{name: string, color: string}[] = [];
  changedLabels: {custId: string, label: string}[] = [];

  constructor(private route: ActivatedRoute, public storeService: StoreService, public dashBoardService: DashBoardService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      this.storeName = id;
      this.dashBoardService.getStoreCustData(id)      
          .subscribe(data => {
            
            this.custs = data.custs;
            this.labels = data.labels;
            this.noCust = this.custs.length == 0;
          }, (e: any) =>{
            console.log(e);
          })
      
    });    
  }

  ngOnInit(): void {
  }

  labelStyle(name) {
    const l = this.labels.find(l => l.name == name);
    
    return (l == undefined) ? '' : 'color: ' + l.color;
  }

  custLabelStyle(cust: CustomerType) {
    
    return this.labelStyle(this.showLabel(cust));
  }

  showLabel(cust: CustomerType) {
    const s = cust.stores.find(s => s.name == this.storeName);

    return s.label;
  }

  talkViaWhats(c: CustomerType) {
    const apiURI = 'https://api.whatsapp.com/send?'
    const argPhone = `phone=55${c.phone}`
    const argsOrder = `&text=${window.encodeURIComponent(this.formatMsgToWhats(c))}`
    return `${apiURI}${argPhone}${argsOrder}`
  }

  formatMsgToWhats(c: CustomerType) {
    return `Olá ${c.name}`;
  }

  onShowCust(name: string) {
    if (this.custToShow.includes(name)) {
      this.custToShow = this.custToShow.filter(s => s != name);
    } else {
      this.custToShow.push(name);
    }
  }

  onChangeCustLabel(newLabel: string, c: CustomerType) {
    const curLabel = c.stores[c.stores.findIndex(s => s.name == this.storeName)].label;

    if (curLabel != newLabel) {
      c.stores[c.stores.findIndex(s => s.name == this.storeName)].label = newLabel;
      c.changed = true;
    }
  }
  
  saveCustomer() {
    this.commandNow = 'spinner';
    this.dashBoardService.putStoreCustomerData(this.custs, this.storeName)
      .subscribe(data => {
        if (data.status == 'OK') {
          this.commandNow = 'confirm';
          this.custs.forEach(c => c.changed = false);
        }
      })
  }

 }

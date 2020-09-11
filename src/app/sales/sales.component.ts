import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, single } from 'rxjs/operators';



import { DashBoardService } from '../services/dashboard.service';
import { StoreService } from '../services/store.service';
import { SalesType } from '../services/types/sales.type'
import { CustomerType } from '../services/types/customer.type';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css',
    './sales.component.css']
})
export class SalesComponent implements OnInit {

  storeName = '';
  viewTotal = false;
  noSales = false;
  viewNow: string = 'recived'
  salesToShow = []

  items: { qty: number, products: string }[] = [];


  constructor(private route: ActivatedRoute,
    public storeService: StoreService,
    public dashBoardService: DashBoardService,
    private router: Router) {
    this.onRefresh();
  }

  clearContext(callback) {
    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      this.storeName = id;
      this.dashBoardService.currentStore = id;
      this.dashBoardService.sales = [];
      this.dashBoardService.labels = [];
      this.dashBoardService.salesDeleted = [];
      this.dashBoardService.salesPickingList = [];

      callback(id);

    });
  }

  curView() {
    if (this.viewNow == 'recived') return  'Recebidos';

    return 'Entregues';
  }

  onRefresh() {
    this.clearContext(id => {
      this.dashBoardService.getStoreSalesData(id)
        .subscribe(data => {
          this.dashBoardService.sales = data.sales;
          this.dashBoardService.labels = data.labels;
          this.viewNow = 'recived';

          if (this.dashBoardService.sales.length == 0) {
            this.noSales = true;
          }

        }, (e: any) => {
          console.log(e)
        })
    });
  }

  onGetHistory() {
    this.clearContext(id => {
      this.dashBoardService.getStoreSalesData(id, 'picked')
        .subscribe(data => {
          this.dashBoardService.sales = data.sales;
          this.dashBoardService.labels = data.labels;
          this.viewNow = 'picked';

          if (this.dashBoardService.sales.length == 0) {
            this.noSales = true;
          }

        }, (e: any) => {
          console.log(e)
        })
    });
  }

  getSelectedSales(): SalesType[] {
    return this.dashBoardService.salesListGrabCopy(this.dashBoardService.sales.filter(s => s.selected));
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

  sumSelectedSales() {
    if (this.dashBoardService.sales.length == 0) return 0;

    return this.dashBoardService.sales.map(s => s.totalAmount).reduce((s1, s2) => s1 + s2, 0)
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

  onSetSelectStatus(status: string) {
    this.dashBoardService.sales.forEach(s => {
      if (s.status == status) {
        s.selected = true;
      }
    })
  }

  onSetSelect(value: boolean) {
    this.dashBoardService.sales.forEach(s => s.selected = value)
  }

  onSetSelectLabel(label: string) {
    this.dashBoardService.sales.forEach(s => {

      if (this.showLabel(s.cust) == label) {
        s.selected = true;
      }
    })
  }

  generatePickingList() {
    this.dashBoardService.salesPickingList = this.getSelectedSales();
    this.router.navigate([this.dashBoardService.currentStore, 'picking'])
  }

  onDeleteSelected() {
    this.dashBoardService.salesDeleted = this.getSelectedSales();
    this.dashBoardService.salesDeleted = this.dashBoardService.salesDeleted.filter(s => s.status == 'picked');

  }


  unDeleteSales(salesId: string) {
    this.dashBoardService.salesDeleted = this.dashBoardService.salesDeleted.filter(s => s.salesId != salesId);
  }

  sendDelete() {
    this.dashBoardService.deleteStoreSalesData();
  }

  labelStyle(name) {
    const l = this.dashBoardService.labels.find(l => l.name == name);

    return (l == undefined) ? '' : 'color: ' + l.color;
  }

  custLabelStyle(cust: CustomerType) {

    return this.labelStyle(this.showLabel(cust));
  }

  showLabel(cust: CustomerType) {
    const s = cust.stores.find(s => s.name == this.dashBoardService.currentStore);

    return s.label;
  }

}

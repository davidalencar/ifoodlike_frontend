import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';



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

  noSales = false;
  viewNow: string = 'sales'
  salesToShow = []

  items: { qty: number, products: string }[] = [];


  constructor(private route: ActivatedRoute, 
    public storeService: StoreService, 
    public dashBoardService: DashBoardService, 
    private router: Router) {
    if (this.dashBoardService.sales.length == 0) {
      this.fill();
    } 
  }

  fill () {
    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {

      this.dashBoardService.getStoreSalesData(id)
        .subscribe(data => {
          this.dashBoardService.sales = data.sales;

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

  onSetSelectStatus(value: boolean, status: string) {
    this.dashBoardService.sales.forEach(s => {
      if (s.status == status){
        s.selected = value
      }    
    })
  }

  onSetSelect(value: boolean) {
    this.dashBoardService.sales.forEach(s => s.selected = value)
  }

  generatePickingList() {
    this.dashBoardService.salesPickingList = this.getSelectedSales();
    this.router.navigate([this.dashBoardService.currentStore, 'picking'])
  }

  deleteSales(s: SalesType) {
    if(!this.dashBoardService.salesDeleted.includes(s)) {
      this.dashBoardService.salesDeleted.push(s);
    }
  }

  unDeleteSales(salesId: string) {
    this.dashBoardService.salesDeleted = this.dashBoardService.salesDeleted.filter(s => s.salesId != salesId);
  }

  sendDelete() {
    this.dashBoardService.deleteStoreSalesData();
  }

}

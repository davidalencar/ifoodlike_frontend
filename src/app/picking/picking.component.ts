import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '../services/dashboard.service';
import { SalesType } from '../services/types/sales.type';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-picking',
  templateUrl: './picking.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css',
    './picking.component.css']
})
export class PickingComponent implements OnInit {
  groupItems: { compose: any[], simple: any[] } = { compose: [], simple: [] };


  constructor(public dashBoardService: DashBoardService, public storeService: StoreService) {
    this.fill();
  }

  ngOnInit(): void {
  }

  listItemsByVend(vendName: string)  {
    var ret =[...this.groupItems.compose.filter(p=>p.productId!= undefined && p.productId.vend == vendName), ...this.groupItems.simple.filter(p=>p.productId!= undefined && p.productId.vend == vendName)]
    console.log(ret)
    return ret;
  }

  mapItemsCostbyVend(list: any[]) {
    return list.map(p => (p.productId != undefined) ? { vend: p.productId.vend, amount: p.productId.cost * p.qty } : { vend: '', amount: 0 })
  }

  sumItemsCost() {
    const vendAmount = [... this.mapItemsCostbyVend(this.groupItems.compose), ... this.mapItemsCostbyVend(this.groupItems.simple)]
    var vendCost: { vend: string, amount: number }[] = [];
    vendAmount.forEach(v => {
      const vendIndex = vendCost.findIndex(va => va.vend == v.vend)
      if (vendIndex > -1) {
        vendCost[vendIndex].amount += v.amount;
      } else {
        vendCost.push(v)
      }

    })
    return vendCost;
  }

  totalItemsCost() {
    return this.sumItemsCost().map(i => i.amount) .reduce((i1, i2) => i1 + i2, 0)
  }

  sumSalesPickingList() {
    return this.dashBoardService.salesPickingList.map(s => s.totalAmount).reduce((s1, s2) => s1 + s2, 0)
  }

  getAllSalesLine(sales: SalesType[]) {
    return sales.map(s => s.lines).reduce((a, b) => {
      a.push(...b);
      return a;
    });
  }


  fill() {
    this.groupItems = { compose: [], simple: [] };
    const selectedSales = this.dashBoardService.salesListGrabCopy(this.dashBoardService.salesPickingList);

    if (selectedSales.length == 0) return;

    const lines = this.getAllSalesLine(selectedSales);
    const linesGroupedByProduct = _.groupBy(lines, 'product');

    Object.keys(linesGroupedByProduct).forEach(pg => {

      if (linesGroupedByProduct[pg][0].items.length > 0) {
        this.groupItems.compose = [...linesGroupedByProduct[pg], ...this.groupItems.compose]
      }
      else {
        const p = linesGroupedByProduct[pg].reduce((a, b) => { a.qty += b.qty; return a; })

        this.groupItems.simple.push(p);
      }
    });
  }

  onOrderSales() {
    this.dashBoardService.salesPickingList = this.dashBoardService.salesPickingList.sort((a, b) => a.deliveryOrder - b.deliveryOrder);
  }

  onSendPickingList() {
    this.dashBoardService.putStoreSalesStaus(this.dashBoardService.salesPickingList, 'picked')
      .subscribe(data => {
        if (data.status == 'OK') {
          this.dashBoardService.sales = [];
          window.print();
        }
      })
  }
}

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
      this.groupItems.compose = [...linesGroupedByProduct[pg].filter(p => p.items.length > 0), ...this.groupItems.compose];

      const simpleList = linesGroupedByProduct[pg].filter(p => p.items.length < 1);

      if (simpleList.length > 0) {
        const sp = simpleList.reduce((a, b) => { a.qty += b.qty; return a; })
        this.groupItems.simple.push(sp);
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

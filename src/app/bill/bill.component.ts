import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { ProductType } from '../services/types/product.type';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  './bill.component.css',
  '../../../node_modules/remixicon/fonts/remixicon.css']
})
export class BillComponent implements OnInit {

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
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
}

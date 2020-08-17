import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service'
import { ProductType } from '../services/types/product.type'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css',
  '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css']
})
export class ItemsComponent implements OnInit {

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }

  onAdd(item: ProductType) {
    item.qty++;
  }
}

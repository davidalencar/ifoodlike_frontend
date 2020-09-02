import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../services/store.service'
import { ProductType } from '../services/types/product.type'

@Component({
  selector: 'app-shelfitem',
  templateUrl: './shelfitem.component.html',
  styleUrls: ['./shelfitem.component.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css']
})
export class ShelfitemComponent implements OnInit {

  @Input() productId: string;

  product: ProductType;

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
    this.product = this.storeService.products
      .find(p => p._id == this.productId);
  }


  onSubtract() {
    this.storeService.basketProductsSubtract(this.product);
  }

  onAdd() {
    this.storeService.basketProductsAdd(this.product);
  }
}

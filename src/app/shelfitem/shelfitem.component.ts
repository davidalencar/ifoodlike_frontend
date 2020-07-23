import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../store.service'
import { product } from '../model/product.entity'

@Component({
  selector: 'app-shelfitem',
  templateUrl: './shelfitem.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ShelfitemComponent implements OnInit {

  @Input() productId :string; 
  
  product: product; 

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
    this.product = this.storeService.products
      .find(p => p.id == this.productId);
  }

  
  onSubtract()
  {
    if (this.product.qty > 0)
      this.product.qty-=1;
  }

  onAdd()
  {
    this.product.qty+=1;
  }
}

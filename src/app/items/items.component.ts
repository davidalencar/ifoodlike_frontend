import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service'
import { ProductType } from '../services/types/product.type'
import { ItemCategoryType } from '../services/types/item.category.type';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css']
})
export class ItemsComponent implements OnInit {

  routerId: string = '';

  constructor(public storeService: StoreService, private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          this.routerId = tree.fragment;         
        }
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.routerId.length > 0) {
      const element = document.getElementById(this.routerId);

      if (element) { 
        element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});         
      }

    }
  }

  onAdd(item: ProductType) {
    if (item.qty < item.maxQty)
      item.qty++;
  }

  onSubtract(item: ProductType) {
    if (item.qty > 0)
      item.qty -= 1;
  }

  checkValue(e, item: ProductType) {

    if (e.target.checked) {
      this.onAdd(item)
    } else {
      this.onSubtract(item)
    }
  }

  selectedValue(e, item: ProductType, category: ItemCategoryType) {
    this.onAdd(item)
    category.products.filter(p => p.name != item.name).forEach(i => {
      if (i.qty > 0) i.qty--
    })
  }

  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from '../services/dashboard.service';
import { StoreService } from '../services/store.service';
import { ProductType } from '../services/types/product.type';
import { ItemCategoryType } from '../services/types/item.category.type';

@Component({
  selector: 'app-sub-item',
  templateUrl: './sub-item.component.html',
  styleUrls: ['../../../node_modules/remixicon/fonts/remixicon.css', './sub-item.component.css']
})
export class SubItemComponent implements OnInit {

  commandNow = "confirm";
  product: ProductType;
  categoriesToShow: string[] = []

  constructor(public storeService: StoreService,
    public dashBoardService: DashBoardService,
    private router: Router) {
    this.product = JSON.parse(JSON.stringify(this.dashBoardService.editProduct));
  }

  ngOnInit(): void {
  }

  onShowCategory(name: string) {
    if (this.categoriesToShow.includes(name)) {
      this.categoriesToShow = this.categoriesToShow.filter(s => s != name);
    } else {
      this.categoriesToShow.push(name);
    }
  }

  onDeleteCategory(name: string) {
    this.product.items = this.product.items.filter(c => c.name != name);
  }

  onDeleteProduct(category: string, productId: string) {
    const cat = this.product.items.find(c => c.name == category);
    cat.products = cat.products.filter(p => p._id != productId);
  }

  canSave() {
    return this.dashBoardService.deepEqual(this.product, this.dashBoardService.editProduct) == false;
  }

  onCategoryCreate(name: string, type: string) {
    const category: ItemCategoryType = {
      name,
      type,
      order: 9999,
      products: []
    };

    this.product.items.push(category);
    this.orderCategory(1, category.name);
  }

  onItemCreate(category, name: string, price: number, qty: number, maxQty: number) {
    var cat = this.product.items.find(c => c.name == category);
    cat.products.push({      
      name,
      price,
      qty,
      maxQty: (cat.type == 'choice') ? 1 : maxQty
    })
  }

  saveSubItems() {
    this.commandNow = 'spinner';
    this.dashBoardService.editProduct = this.product;
    this.dashBoardService.putStoreProduct()
      .subscribe((saved: ProductType) => {
        this.commandNow = 'confirm';        
        this.dashBoardService.editProduct = saved;
        this.product = JSON.parse(JSON.stringify(saved));
      })
  }

  sortCategories() {
    return this.product.items.sort((c1, c2) => {
      return c1.order - c2.order
    });
  }

  orderCategory(plus: number, category: string) {
    this.product.items.find(c => c.name == category).order += plus * 2;
    this.product.items = this.sortCategories();
    for (let index = 0; index < this.product.items.length; index++) {
      const element = this.product.items[index].order = index;
    }
  }
}

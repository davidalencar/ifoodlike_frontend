import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { DashBoardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';
import { ProductType } from '../services/types/product.type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './product.component.css']
})
export class ProductComponent implements OnInit {

  productsToShow:string[] = [];
  products: ProductType[] = [];
  categories:{name: string, enable: boolean, order: number}[] = [];

  constructor(private route: ActivatedRoute, public storeService: StoreService, public dashBoardService: DashBoardService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      
      this.dashBoardService.getStoreProductsData(id)      
          .subscribe(data => {
            this.categories = this.dashBoardService.sortCategories(data.categories);
            this.products = data.products;
          }, (e: any) =>{
            console.log(e);
          })
      
    });    
  }

  ngOnInit(): void {
  }

  showProduct(id: string) {
    if (this.productsToShow.includes(id)) {
      this.productsToShow = this.productsToShow.filter(i => i != id)
    } else {
      this.productsToShow.push(id)
    }
  }
}

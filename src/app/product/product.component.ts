import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { DashBoardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';
import { ProductType } from '../services/types/product.type';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './product.component.css']
})
export class ProductComponent implements OnInit {

  commandNow: string = 'confirm';
  
  storeName: string = '';
  productsToShow:string[] = [];
  categoriesToShow:string[] = [];
  products: ProductType[] = [];
  categories:{name: string, enable: boolean, order: number}[] = [];
  noProducts = false;

  constructor(private route: ActivatedRoute, 
    public storeService: StoreService, 
    public dashBoardService: DashBoardService, 
    private titleService: Title,
    private router: Router) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      this.storeName = id;
      this.dashBoardService.getStoreProductsData(id)      
          .subscribe(data => {
            this.categories = this.dashBoardService.sortCategories(data.categories);
            this.products = data.products;
            this.noProducts = this.products.length == 0;
          }, (e: any) =>{
            console.log(e);
          })
          this.titleService.setTitle(`${this.storeName} - Produtos`);
    });    
  }

  ngOnInit(): void {
  }

  noCategory() {
    return this.products.filter(p => this.categories.findIndex(c => c.name == p.category) == -1)
  }

  showProduct(id: string) {
    if (this.productsToShow.includes(id)) {
      this.productsToShow = this.productsToShow.filter(i => i != id)
    } else {
      this.productsToShow.push(id)
    }
  }

  showCategory(name: string) {
    if (this.categoriesToShow.includes(name)) {
      this.categoriesToShow = this.categoriesToShow.filter(i => i != name)
    } else {
      this.categoriesToShow.push(name)
    }
  }

  onItemCreate(category: string, name: string, price: number) {
    this.dashBoardService.editProduct = {
      name,
      category,
      price,
      items: [],
      enable: true,
      changed: false,
      store: this.storeName
    };
    this.router.navigate(['/', this.storeName, 'product'])
  }

  changeItem(p: ProductType) {
    p.enable = !p.enable;
    p.changed = true;
  }

  onChangeCategory(category: string, p: ProductType) {
    if (!this.categoriesToShow.includes(category)) {
      this.categoriesToShow.push(category)
    }
    if (!this.productsToShow.includes(p._id)) {      
      this.productsToShow.push(p._id)
    } 
    
    p.category = category,
    p.changed = true;

  }

  saveProducts() {
    this.commandNow = 'spinner';
    this.dashBoardService.putStoreProductsData(this.products, this.storeName)
      .subscribe(data => {
        if (data.status == 'OK') {
          this.commandNow = 'confirm';
          this.products.forEach(p=> p.changed = false);
        }
      })
  }

  onEditProduct(p) {
    this.dashBoardService.editProduct = p;
    this.router.navigate(['/', this.storeName, 'product'])
  }
}

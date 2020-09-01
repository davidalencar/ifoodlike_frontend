import { Component, OnInit } from '@angular/core';
import { ProductType } from '../services/types/product.type';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';
import { DashBoardService } from '../services/dashboard.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productCompare: ProductType;
  sectionsToShow: string[] = ['geral'];
  commandNow = "confirm";


  constructor(public storeService: StoreService,
    public dashBoardService: DashBoardService,
    private router: Router) {
    this.productCompare = JSON.parse(JSON.stringify(this.dashBoardService.editProduct));
  }

  ngOnInit(): void {

  }


  isNewProduct() {
    return this.dashBoardService.editProduct._id == undefined;
  }

  isChangedProduct() {
    return this.dashBoardService.deepEqual(this.dashBoardService.editProduct, this.productCompare) == false;
  }

  isValidProduct() {
    if (this.dashBoardService.editProduct.name.length < 0) return false;

    return true;
  }



  canSave() {
    return  this.isValidProduct() && (this.isChangedProduct() || this.isNewProduct());
  }

  saveProduct() {
    this.commandNow = 'spinner';

    const refreshProduct = (saved: ProductType) => {
      this.commandNow = 'confirm';
      this.dashBoardService.editProduct = saved;
      this.productCompare = JSON.parse(JSON.stringify(saved));
    }

    if (this.dashBoardService.editProduct._id == undefined || this.dashBoardService.editProduct._id == '') {
      this.dashBoardService.postStoreProduct()
        .subscribe(refreshProduct)
    } else {

      this.dashBoardService.putStoreProduct()
        .subscribe(refreshProduct)
    }
  }




  onShowSection(name: string) {
    if (this.sectionsToShow.includes(name)) {
      this.sectionsToShow = this.sectionsToShow.filter(s => s != name);
    } else {
      this.sectionsToShow.push(name);
    }
  }

  onDelProduct() {
    this.dashBoardService.deleteStoreProduct()
      .subscribe(data => {
        if (data.status == 'OK') {
          this.router.navigate(['/', this.dashBoardService.currentStore, 'products'])
        }
      })
  }

}

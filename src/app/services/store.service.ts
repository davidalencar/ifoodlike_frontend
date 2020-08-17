import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { ProductType } from './types/product.type'
import { StoreType } from './types/store.type'
import { StoreServiceResponseType } from './types/store.service.response.type'



const store_api_uri = 'https://fathomless-chamber-28156.herokuapp.com/api/stores/'

@Injectable()
export class StoreService {

    store: StoreType;
    products: ProductType[];
    categories = [];

    getCategories() {
         this.categories = [...this.store.categories].sort((c1, c2) => {
            return c1.order - c2.order
        }).filter(c => c.enable == true)
    }

    basketProducts() {
        return this.orderProductsByName(this.products.filter(p => p.qty > 0))    
    }

    bakestTotalAmount() {
        var basket = this.basketProducts();

        if (basket.length == 0) return 0;

        return basket.map(p => p.price * p.qty).reduce((sum, value) => sum + value);
    }

    hasProductsOnBasket() {
        return this.basketProducts().length > 0;
    }

    storeTaxesTotalAmount() {
        if (this.store.taxes.length == 0) return 0;

        return this.store.taxes.map(t => t.value).reduce((sum, value) => sum + value);
    }

    basketTotalAmountWithTaxes() {
        return this.bakestTotalAmount() + this.storeTaxesTotalAmount();
    }

    canSubmitOrder() {
        return this.hasProductsOnBasket() &&
            this.bakestTotalAmount() >= this.store.minimumOrderAmount;
    }

    remainToMinimumOrderAmount() {
        return this.store.minimumOrderAmount - this.bakestTotalAmount();
    }

    formatPrice(value: number) {
        return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    }

    productsByCategory(category: string) {
        return this.orderProductsByName(this.products.filter(p => p.category == category))
            
    }

    orderProductsByName(list: ProductType[]) {
        return list.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }


    storeDataRequest(storename: string): Observable<StoreServiceResponseType> {
        const url = `${store_api_uri}${storename}`;
        return this.http.get<StoreServiceResponseType>(url);
    }

    getStoreData(storeName: string) {
        this.storeDataRequest(storeName)
            .subscribe((data:StoreServiceResponseType) => {
                this.store = data.store;                
                this.products = data.products.map((p =>{
                    p.qty = 0;
                    return p;
                }));
                this.titleService.setTitle(this.store.title)
                this.getCategories();
            })
    }

    constructor(private http: HttpClient, private titleService: Title) {
        this.store = new StoreType()
        this.products = [new ProductType()]
    }

}
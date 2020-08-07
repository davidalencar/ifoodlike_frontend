import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
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

    basket: { id: number, name: string, unit: string, price: number, qty: number }[];

    getCategories() {
        this.products.forEach(product => {
            product.qty = 0;
            if (!this.categories.includes(product.category))
                this.categories.push(product.category);
        });
    }

    basketProducts() {
        return this.products.filter(p => p.qty > 0)
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
        return this.products.filter(p => p.category == category);
    }


    storeDataRequest(storename: string): Observable<StoreServiceResponseType> {
        const url = `${store_api_uri}${storename}`;
        return this.http.get<StoreServiceResponseType>(url);
    }

    getStoreData(storeName: string) {
        this.storeDataRequest(storeName)
            .subscribe((data:StoreServiceResponseType) => {
                this.store = data.store;
                this.products = data.products;
                this.titleService.setTitle(this.store.title)
                this.getCategories();
            })
    }

    constructor(private http: HttpClient, private titleService: Title) {
        this.store = new StoreType()
        this.products = [new ProductType()]
    }

}
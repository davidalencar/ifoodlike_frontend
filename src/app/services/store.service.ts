import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { ProductType } from './types/product.type'
import { StoreType } from './types/store.type'
import { StoreServiceResponseType } from './types/store.service.response.type'
import { ItemType } from './types/item.type';
import { ItemCategoryType } from './types/item.category.type'


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

    basketProductsWithItems() {
        return this.basketProducts().filter(p => p.items.length > 0)
    }

    basketProductsWithChoicesToMake() {
        return this.basketProducts().filter(p => p.items.filter(c=> c.type == 'choice').length > 0)
    }

    getItemsInProductItemCategory(category: ItemCategoryType) {
        return this.orderProductItemsByName(category.products.filter(i => i.qty > 0))
    }

    validateProductItemCategory(category: ItemCategoryType){
       
        if (category.type == 'choice' && this.getItemsInProductItemCategory(category).length == 0) {
            console.log(category.name, category.type)
            return false;
        }

        return true;
    }

    hasBasketProductsWithItems(){
        return this.basketProductsWithItems().length > 0;
    }

    bakestTotalAmount() {
        var basket = this.basketProducts();

        if (basket.length == 0) return 0;

        let amountCur = 0;

        amountCur+= basket.map(p => {            
            var lineAmount = p.items.map( i => i.products.map(p => p.price * p.qty).reduce((sum, value) => sum + value, 0)).reduce((sum, value) => sum + value, 0);
            
            return p.price * p.qty + lineAmount * p.qty;
        }).reduce((sum, value) => sum + value);            

        return amountCur;
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

    wereAllChoicesMade() {
        
        return this.basketProductsWithChoicesToMake().map(p => p.items.map( c=> this.validateProductItemCategory(c)).reduce((vl1, vl2) => vl1 == vl2)).reduce((vl1, vl2) => vl1 == vl2)

    }

    canSubmitOrder() {
        return this.wereAllChoicesMade() && 
            this.hasProductsOnBasket() &&
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

    orderProductItemsByName(list: ItemType[]) {
        return list.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }

    orderProductItemsCategory(list: ItemCategoryType[]) {
        return list.sort((c1, c2) => {
            return c1.order - c2.order
        })

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
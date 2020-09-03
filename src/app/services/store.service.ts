import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

import { ProductType } from './types/product.type';
import { StoreType } from './types/store.type';
import { StoreServiceResponseType } from './types/store.service.response.type';
import { ItemType } from './types/item.type';
import { ItemCategoryType } from './types/item.category.type';
import { OrderType } from './types/order.type';
import { SalesResponseType } from './types/sales.response.type';
import { SalesType } from './types/sales.type'

@Injectable()
export class StoreService {

    salesId: string = '';
    store: StoreType;
    basket: ProductType[] = [];
    products: ProductType[];
    categories = [];
    order: OrderType;

    getStoreStatus() {
        const day = moment().day();
        const time = Number.parseFloat(moment().hour() + '.' + moment().minute());        
        
        if (this.store.workday == undefined) return 'fechado';

        const workDay = this.store.workday.find(d => d.day == day);

        if (workDay == undefined) return 'fechado';

        if (workDay.hours.findIndex(h => time >= h.from && time <= h.to) < 0) return 'fechado';
        
        return 'aberto';
    }    

    getCategories() {
        this.categories = [...this.store.categories].sort((c1, c2) => {
            return c1.order - c2.order
        }).filter(c => c.enable == true)
    }

    basketProductsAdd(p: ProductType) {
        var bp = this.basket.find(i => i._id == p._id);

        if (bp == undefined) {
            p.qty = 1;
            this.basket.push(JSON.parse(JSON.stringify(p)));
        } else if (bp.items.length > 0) {
            this.basket.push(JSON.parse(JSON.stringify(p)));            
            p.qty ++;
            this.basket[this.basket.length -1].name = `${p.name} ( ${p.qty} )`
            this.basket[this.basket.length -1].qty = 1;
        } else {
            p.qty++;
            bp.qty++;
        }

    }

    basketProductsSubtract(p: ProductType) {
        var bp = this.basket.find(i => i._id == p._id);

        if(bp == undefined) return;
        if (p.qty == 0) return;

        if (bp.items.length > 0) {
            this.basket = this.basket.filter(i => i._id != p._id);
            p.qty = 0;
        } else {
            bp.qty --;
            p.qty --;
        }
        

    }

    basketProducts() {
        return this.orderProductsByName(this.basket)
    }

    basketProductsWithItems() {
        return this.basketProducts().filter(p => p.items.length > 0)
    }

    basketProductsWithChoicesToMake() {
        return this.basketProducts().filter(p => p.items.filter(c => c.type == 'choice').length > 0)
    }

    getItemsInProductItemCategory(category: ItemCategoryType) {
        return this.orderProductItemsByName(category.products.filter(i => i.qty > 0))
    }

    validateProductItemCategory(category: ItemCategoryType) {

        if (category.type == 'choice' && this.getItemsInProductItemCategory(category).length == 0) {
            return false;
        }

        return true;
    }

    hasBasketProductsWithItems() {
        return this.basketProductsWithItems().length > 0;
    }

    bakestTotalAmount() {
        var basket = this.basketProducts();

        if (basket.length == 0) return 0;

        return basket.map(p => this.totalLineAmount(p)).reduce((sum, value) => sum + value);
    }

    totalLineAmount(p: ProductType) {
        var lineAmount = p.items.map(i => i.products.map(p => p.price * p.qty).reduce((sum, value) => sum + value, 0)).reduce((sum, value) => sum + value, 0);

        return p.price * p.qty + lineAmount * p.qty;
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

        return this.basketProductsWithChoicesToMake().map(p => p.items.map(c => this.validateProductItemCategory(c)).reduce((vl1, vl2) => vl1 && vl2), true).reduce((vl1, vl2) => vl1 && vl2, true)

    }

    hasPaymMethodBeenSet() {
        return this.order.paymMethod;
    }

    minOrderReached() {
        return this.bakestTotalAmount() >= this.store.minimumOrderAmount
    }

    hasValidaAddress() {

        if (this.order.address == undefined) return false;
        if (this.order.address.cep == undefined) return false;
        if (this.order.address.logradouro == undefined) return false;
        if (this.order.address.localidade == undefined) return false;
        if (this.order.address.numero == undefined) return false;
        if (this.order.address.numero == '') return false;

        return true;
    }

    formatAddressLine1() {
        var line1 = `${this.order.address.logradouro}, ${this.order.address.numero}`
        if (this.order.address.complemento != undefined && this.order.address.complemento != '') {
            line1 += ` - ${this.order.address.complemento}`
        }
        return line1;
    }

    formatAddressLine2() {
        return `${this.order.address.bairro}, ${this.order.address.localidade}/${this.order.address.uf}`
    }


    canSubmitOrder() {
        return this.hasProductsOnBasket() &&
            this.wereAllChoicesMade() &&
            this.minOrderReached() &&
            this.hasPaymMethodBeenSet();
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
        return list.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0)
            .sort((a, b) => (a.enable && !b.enable) ? -1 : (b.enable && !a.enable) ? 1 : 0)
    }

    orderProductItemsByName(list: ItemType[]) {
        return list.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }

    orderProductItemsCategory(list: ItemCategoryType[]) {
        return list.sort((c1, c2) => {
            return c1.order - c2.order
        })

    }

    formatSalesId(salesid: string) {
        var orderFormated = String(salesid);
        return `#${orderFormated.padStart(4, '0')}`
    }


    storeDataRequest(storename: string): Observable<StoreServiceResponseType> {
        const url = `${environment.loja_api}stores/${storename}`;
        return this.http.get<StoreServiceResponseType>(url);
    }

    getStoreData(storeName: string) {
        this.storeDataRequest(storeName)
            .subscribe((data: StoreServiceResponseType) => {
                this.store = data.store;
                this.store.workday = [{
                    day: 4,
                    hours: [{from: 9, to: 10}]
                }, 
                {
                    day: 5,
                    hours: [{from: 9, to: 11}, {from: 18, to: 22}]
                }];
                this.products = data.products;
                this.titleService.setTitle(this.store.title)                
                this.getCategories();
            })
    }

    sendOrder() {
        const url = `${environment.loja_api}sales`;

        return this.http.post<SalesResponseType>(url, this.createOrder())
    }

    createOrder() {
        var data = {
            customer: {
                name: this.order.userName,
                phone: this.order.userPhone,
                address: {
                    zipCode: this.order.address.cep,
                    street: this.order.address.logradouro,
                    number: this.order.address.numero,
                    district: this.order.address.bairro,
                    city: this.order.address.localidade,
                    state: this.order.address.uf,
                    complement: this.order.address.complemento
                },
                stores: [
                    {
                        name: this.store.name
                    }
                ]
            },
            order: {
                store: this.store.name,
                paymMethod: this.order.paymMethod,
                totalAmount: this.basketTotalAmountWithTaxes(),
                instruction: this.order.instruction,
                taxes: this.store.taxes,
                lines: []
            }
        }

        this.basketProducts().forEach(p => {
            var line = { qty: p.qty, productId: p, product: p.name, amount: this.totalLineAmount(p), items: [] }

            this.orderProductItemsCategory(p.items).forEach(c => {
                var citem = { category: c.name, items: [] }

                this.getItemsInProductItemCategory(c).forEach(i => {
                    if (i.qty > 0) {
                        citem.items.push({ qty: i.qty, item: i.name })
                    }
                })
                if (citem.items.length > 0) {
                    line.items.push(citem)
                }
            })
            data.order.lines.push(line)
        })

        return data;
    }

    constructor(private http: HttpClient, private titleService: Title) {
        this.store = new StoreType()
        this.products = [new ProductType()]
        this.order = new OrderType();
    }

}
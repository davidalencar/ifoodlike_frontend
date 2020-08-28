import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

import { UserType } from './types/user.type'
import { TokenType } from './types/token.type'
import { SalesType } from './types/sales.type';
import { ProductType } from './types/product.type';
import { StoreType } from './types/store.type';



@Injectable()
export class DashBoardService {

    userToken: TokenType = { access_token: '', userName: '', stores: [] }
    sales: SalesType[] = [];
    salesDeleted: SalesType[] = [];
    salesPickingList: SalesType[] = [];
    currentStore: string = '';

    constructor(private http: HttpClient) { }


    login(email: string, password: string) {
        return this.http.post<TokenType>(`${environment.loja_api}accounts`, {
            email,
            password
        })
    }

    createUser(name: string, phone: string, email: string, plan: string, store: string) {

        return this.http.post<{ status: string, user: UserType} >(`${environment.loja_api}users`, { name, phone, email, plan, store })
    }


    getStoreData(storeName: string) {
        this.currentStore = storeName;
        const url = `${environment.loja_api}stores/control/${storeName}`;

        return this.http.get<{ store: StoreType }>(url, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    getStoreSalesData(storeName: string) {
        this.currentStore = storeName;
        const url = `${environment.loja_api}sales/${storeName}`;

        return this.http.get<{ sales: SalesType[] }>(url, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    salesListGrabCopy(list: SalesType[]): SalesType[] {
        return JSON.parse(JSON.stringify(list));
    }

    ordeLineProductByName(list: any[]) {
        return list.sort((a, b) => (a.product > b.product) ? 1 : ((b.product > a.product) ? -1 : 0))
    }

    filterChangedProducts(list: ProductType[]) {
        return list.filter(p => p.changed);
    }

    putStoreProductsData(list: ProductType[], storeName: string) {

        const url = `${environment.loja_api}products/control/${storeName}`;
        const data = this.filterChangedProducts(list).map(p => {
            return { id: p._id, enable: p.enable, category: p.category };
        })

        return this.http.put<{ status: string }>(url, { products: data }, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    deleteStoreSalesData() {
        const url = `${environment.loja_api}sales/deleteMany/${this.currentStore}`;
        const data = this.salesDeleted.map(s => {
            return { salesId: s.salesId };
        })

        this.http.post<{ status: string }>(url, { sales: data }, {
            headers: { 'Authorization': this.userToken.access_token }
        }).subscribe(status => {
            if (status.status == 'OK') {
                this.getStoreSalesData(this.currentStore)
                    .subscribe(sales => {
                        this.salesDeleted = [];
                        this.sales = sales.sales;
                    })
            }
        }, e => console.log(e))
    }

    putStoreSalesStaus(list: SalesType[], newStatus: string) {
        const url = `${environment.loja_api}sales/status/${this.currentStore}`;
        const data = list.map(s => {
            return { salesId: s.salesId, newStatus };
        })

        return this.http.put<{ status: string }>(url, { status: data }, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    getStoreProductsData(storeName: string) {
        const url = `${environment.loja_api}products/${storeName}`;

        return this.http.get<{
            categories: {
                name: string,
                enable: boolean,
                order: number
            }[],
            products: ProductType[]
        }
        >(url, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    sortCategories(list: any) {
        return [...list].sort((c1, c2) => {
            return c1.order - c2.order
        })
    }

    filterProductsByCategory(list: ProductType[], category: string) {
        return this.orderByName(list.filter(p => p.category == category))
    }

    orderByName(list: any[]) {
        return list.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }

    formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY HH:mm')
    }

    formatDeliveryAddressL1(s: SalesType) {
        const ad = s.cust.address;
        return `${ad.street}, ${ad.number}${(ad.complement) ? ' - ' + ad.complement : ''}`
    }

    formatDeliveryAddressL2(s: SalesType) {
        const ad = s.cust.address;
        return `CEP: ${ad.zipCode} - ${ad.district} - ${ad.city}/${ad.state}`
    }


    storeUpdate(store: StoreType) {
        const url = `${environment.loja_api}stores/${this.currentStore}`;
       
        return this.http.put<StoreType>(url, store, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }
}
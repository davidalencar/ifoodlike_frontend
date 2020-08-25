import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

import { UserType } from './types/user.type'
import { TokenType } from './types/token.type'
import { SalesType } from './types/sales.type';
import { ProductType } from './types/product.type';


@Injectable()
export class DashBoardService {
    constructor(private http: HttpClient) { }

    userToken: TokenType = {
        access_token: '',
        userName: '',
        stores: []
    }

    login(email: string, password: string) {
        return this.http.post<TokenType>(`${environment.loja_api}accounts`, {
            email,
            password
        })
    }

    createUser(uname: string, uphone: string, uemail: string, plan: string): Observable<UserType> {
        const user = new UserType();
        user.name = uname;
        user.phone = uphone;
        user.email = uemail;
        user.plan = plan;
        return this.http.post<UserType>(`${environment.loja_api}users`, user)
    }

    getStoreSalesData(storeName: string) {
        const url = `${environment.loja_api}sales/${storeName}`;

        return this.http.get<{ sales: SalesType[] }>(url, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    getStoreProductsData(storeName: string) {
        const url = `${environment.loja_api}products/${storeName}`;

        return this.http.get<{
            categories: {
                name: string, 
                enable: boolean, 
                order: number}[],
            products:ProductType[]}
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
}
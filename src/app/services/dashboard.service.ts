import * as _ from 'lodash';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import * as XLSX from 'xlsx';

import { UserType } from './types/user.type'
import { TokenType } from './types/token.type'
import { SalesType } from './types/sales.type';
import { ProductType } from './types/product.type';
import { StoreType } from './types/store.type';
import { CustomerType } from './types/customer.type';
import { isObject } from 'lodash';



@Injectable()
export class DashBoardService {

    userToken: TokenType = { access_token: '', userName: '', userPlan: '', stores: [] }
    labels: { name: string, color: string }[] = [];
    sales: SalesType[] = [];
    salesDeleted: SalesType[] = [];
    salesPickingList: SalesType[] = [];
    currentStore: string = '';
    editProduct: ProductType;

    constructor(private http: HttpClient) { }

    convertSalesToExcelData(list: SalesType[]): string[][] {
        var data = [['Etiqueta', 'Pedido', 'Status', 'Data', 'Hora', 'Pagamento', 'Total', 
                    'Instruções', 'Produto', 'Categoria', 'Preço', 'Qtde', 'Valor', 
                    'Cliente', 'Telefone', 'Cidade', 'UF', 'Bairro', 'Endereço', 'Num', 
                    'Complemento', 'CEP']];
       

        for (let index = 0; index < list.length; index++) {
            const sale = list[index];

            for (let index = 0; index < sale.lines.length; index++) {
                const line = sale.lines[index];
                var dataLine: string[] =  [];

                dataLine.push(sale.cust.stores.find(s=>s.name == sale.store).label);
                dataLine.push(sale.salesId);
                switch (sale.status) {
                    case 'received':  dataLine.push('Recebido'); break;
                    case 'picked':  dataLine.push('Entregue'); break;
                    
                }                

                if(sale.schedule != undefined)  {
                                        
                    dataLine.push(this.formatDate(sale.schedule.date));
                    dataLine.push(sale.schedule.period);
                    
                } else {
                    dataLine.push(this.formatDate(sale.time));
                    dataLine.push(this.formatTime(sale.time));
                    
                }

                switch (sale.paymMethod) {
                    case 'credit':  dataLine.push('cartão'); break;
                    case 'money':  dataLine.push('dinheiro'); break;
                    case 'transfer':  dataLine.push('transferência'); break;
                }
                
                dataLine.push(sale.totalAmount.toString());
                dataLine.push(sale.instruction);
                dataLine.push(line.productId.name);
                dataLine.push(line.productId.category);
                dataLine.push(line.productId.price.toString());
                dataLine.push(line.qty.toString());
                dataLine.push(line.amount.toString());
                dataLine.push(sale.cust.name);
                dataLine.push(sale.cust.phone);
                dataLine.push(sale.cust.address.city);
                dataLine.push(sale.cust.address.state);                
                dataLine.push(sale.cust.address.district);
                dataLine.push(sale.cust.address.street);
                dataLine.push(sale.cust.address.number);
                dataLine.push(sale.cust.address.complement);
                dataLine.push(sale.cust.address.zipCode);
                data.push(dataLine);                
            }
            
        }

        return data;
    }

    exportToExcel(list: SalesType[]) {

        const data = this.convertSalesToExcelData(list);
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);


        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


        XLSX.writeFile(wb, 'Pedidos-bslista.xlsx');
    }

    userChangePwd(newPwd) {
        let url = `${environment.loja_api}users/${this.userToken.stores[0]}/pwd`
        return this.http.post<{ status: string, user: UserType }>(url, { newPwd }, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    logout() {
        this.userToken = { access_token: '', userName: '', userPlan: '', stores: [] };
        localStorage.removeItem('userToken');
    }

    setToken(token: TokenType) {
        this.userToken = token;
        localStorage.setItem('userToken', JSON.stringify(token));
    }

    getToken(): TokenType {
        if (this.userToken.access_token == '') {
            this.userToken = JSON.parse(localStorage.getItem('userToken'));
        }
        return this.userToken;
    }


    login(email: string, password: string) {
        return this.http.post<TokenType>(`${environment.loja_api}accounts`, {
            email,
            password
        })
    }

    createUser(name: string, phone: string, email: string, plan: string, store: string) {

        return this.http.post<{ status: string, user: UserType }>(`${environment.loja_api}users`, { name, phone, email, plan, store })
    }


    getStoreData(storeName: string) {
        this.currentStore = storeName;
        const url = `${environment.loja_api}stores/control/${storeName}`;

        return this.http.get<{ store: StoreType }>(url, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    getStoreSalesData(storeName: string, status: string = 'received') {
        this.currentStore = storeName;
        const url = `${environment.loja_api}sales/${storeName}/${status}`;

        return this.http.get<{ sales: SalesType[], labels: { name: string, color: string }[] }>(url, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }    

    getStoreCustData(storeName: string) {
        this.currentStore = storeName;
        const url = `${environment.loja_api}custs/${storeName}`;

        return this.http.get<{ custs: CustomerType[], labels: { name: string, color: string }[] }>(url, {
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

    filterChangedCustomer(list: CustomerType[]) {
        return list.filter(c => c.changed);
    }

    putStoreCustomerData(list: CustomerType[], storeName: string) {
        const url = `${environment.loja_api}custs/${storeName}`;
        const data = this.filterChangedCustomer(list).map(c => {
            return { custId: c._id, label: c.stores[c.stores.findIndex(s => s.name == storeName)].label };
        })

        return this.http.put<{ status: string }>(url, { labes: data }, {
            headers: { 'Authorization': this.userToken.access_token }
        })
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


    postStoreProduct() {
        const url = `${environment.loja_api}products/${this.currentStore}`;

        return this.http.post<ProductType>(url, this.editProduct, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    putStoreProduct() {
        const url = `${environment.loja_api}products/${this.currentStore}/${this.editProduct._id}`;

        return this.http.put<ProductType>(url, this.editProduct, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    deleteStoreProduct() {
        const url = `${environment.loja_api}products/${this.currentStore}/${this.editProduct._id}`;

        return this.http.delete<{ status: string }>(url, {
            headers: { 'Authorization': this.userToken.access_token }
        });
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
        this.currentStore = storeName;
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
        return moment(date).format('DD/MM/YYYY')
    }

    formatDateDDMM(date: Date) {
        return moment(date).format('DD/MM')
    }

    formatDateTime(date: Date) {
        return moment(date).format('DD/MM HH:mm')
    }

    formatTime(date: Date) {
        return moment(date).format('HH:mm')
    }

    formatDeliveryAddressL1(cust: CustomerType) {
        const ad = cust.address;
        return `${ad.street}, ${ad.number}${(ad.complement) ? ' - ' + ad.complement : ''}`
    }

    formatDeliveryAddressL2(cust: CustomerType) {
        const ad = cust.address;
        return `CEP: ${ad.zipCode} - ${ad.district} - ${ad.city}/${ad.state}`
    }


    storeUpdate(store: StoreType) {
        const url = `${environment.loja_api}stores/${this.currentStore}`;

        return this.http.put<StoreType>(url, store, {
            headers: { 'Authorization': this.userToken.access_token }
        })
    }

    calcSalesCost(sale: SalesType) {
        return sale.lines.map(l => (l.productId != undefined) ? l.productId.cost * l.qty : 0).reduce((a, b) => a + b, 0);
    }

    deepEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = isObject(val1) && isObject(val2);
            if (
                areObjects && !this.deepEqual(val1, val2) ||
                !areObjects && val1 !== val2
            ) {
                return false;
            }
        }

        return true;
    }
}
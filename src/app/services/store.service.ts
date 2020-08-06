import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { ProductType } from './types/product.type'
import { StoreType } from './types/store.type'
import { StoreServiceResponseType } from './types/store.service.response.type'



const store_api_uri = 'http://localhost:3000/api/stores/'

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
                this.titleService.setTitle(this.store.name)
                this.getCategories();
            })
    }

    constructor(private http: HttpClient, private titleService: Title) {
        this.store = new StoreType()
        this.products = [new ProductType()]
    }

}

/*
{
        name: 'Erva Rasteira',
        complement: 'Agroecologia - Produtos orgânicos toda a semana',
        shelfTitle: 'Lista da semana',
        unitTitle: 'Porção',
        productTitle: 'Alimentos',
        minimumOrderAmount: 20,
        phone: '5511992533637',
        taxes: [
            { name: 'Frete', value: 10 }
        ]
    }

[
        {
            "_id": "1",
            "name": "Abacate ",
            "unit": "unidade",
            "description": "Quisque in sollicitudin risus. Aenean eu massa lacinia, tempus nulla eu, gravida tortor. Fusce eu accumsan eros. Nulla libero justo, vulputate quis placerat sit amet, elementum et.",
            "price": 3.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "2",
            "name": "Acafrao",
            "unit": "200g",
            "price": 6.50,
            "category": "Verduras",
            "enable": true,
            "img": ""
        },
        {
            "_id": "3",
            "name": "Alface Americano",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "4",
            "name": "Alface Crespa",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "5",
            "name": "Alface Lisa",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "6",
            "name": "Almeirão",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "7",
            "name": "Babosa",
            "unit": "Folha",
            "price": 2.00,
            "category": "Especiais",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "8",
            "name": "Banana",
            "unit": "Quilo",
            "price": 5.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "9",
            "name": "Beterraba",
            "unit": "Maço",
            "price": 4.50,
            "category": "Legumes",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "10",
            "name": "Bucha Vegetal",
            "unit": "Pedaço",
            "price": 5.00,
            "category": "Especiais",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "11",
            "name": "Cebolinha",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "12",
            "name": "Cenoura",
            "unit": "Maço",
            "price": 4.50,
            "category": "Legumes",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "13",
            "name": "Coentro Comum",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "14",
            "name": "Colorau ",
            "unit": "100g",
            "price": 5.00,
            "category": "Temperos",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "15",
            "name": "Couve",
            "unit": "Maço",
            "price": 3.50,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "16",
            "name": "Escarola",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "17",
            "name": "Espinafre",
            "unit": "Maço",
            "price": 3.50,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "18",
            "name": "Jaca",
            "unit": "Pequena",
            "price": 12.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "19",
            "name": "Jaca",
            "unit": "Média ",
            "price": 17.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "20",
            "name": "Jaca",
            "unit": "Grande",
            "price": 25.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "21",
            "name": "Limão",
            "unit": "Dúzia",
            "price": 5.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "22",
            "name": "Louro",
            "unit": "Maço",
            "price": 5.00,
            "category": "Temperos",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "23",
            "name": "Mamão Verde",
            "unit": "unidade",
            "price": 3.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "24",
            "name": "Maracujá Doce",
            "unit": "3 por",
            "price": 6.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "25",
            "name": "Repolho",
            "unit": "unidade",
            "price": 4.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "26",
            "name": "Rúcula",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "_id": "27",
            "name": "Salca",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        }
    ];
*/
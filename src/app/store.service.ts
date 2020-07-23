import { product } from './model/product.entity'
import { store } from './model/store.entity'
export class StoreService {

    store: store ={
        name: 'Erva Rasteira',
        complement: 'Agroecologia - Produtos orgânicos toda a semana',
        shelfTitle: 'Lista da semana'
    }

    products:product[] = [
        {
            "id": "1",
            "name": "Abacate ",
            "unit": "unidade",
            "price": 3.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "2",
            "name": "Acafrao",
            "unit": "200g",
            "price": 6.50,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "3",
            "name": "Alface Americano",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "4",
            "name": "Alface Crespa",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "5",
            "name": "Alface Lisa",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "6",
            "name": "Almeirão",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "7",
            "name": "Babosa",
            "unit": "Folha",
            "price": 2.00,
            "category": "Especiais",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "8",
            "name": "Banana",
            "unit": "Quilo",
            "price": 5.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "9",
            "name": "Beterraba",
            "unit": "Maço",
            "price": 4.50,
            "category": "Legumes",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "10",
            "name": "Bucha Vegetal",
            "unit": "Pedaço",
            "price": 5.00,
            "category": "Especiais",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "11",
            "name": "Cebolinha",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "12",
            "name": "Cenoura",
            "unit": "Maço",
            "price": 4.50,
            "category": "Legumes",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "13",
            "name": "Coentro Comum",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "14",
            "name": "Colorau ",
            "unit": "100g",
            "price": 5.00,
            "category": "Temperos",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "15",
            "name": "Couve",
            "unit": "Maço",
            "price": 3.50,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "16",
            "name": "Escarola",
            "unit": "Pé ",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "17",
            "name": "Espinafre",
            "unit": "Maço",
            "price": 3.50,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "18",
            "name": "Jaca",
            "unit": "Pequena",
            "price": 12.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "19",
            "name": "Jaca",
            "unit": "Média ",
            "price": 17.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "20",
            "name": "Jaca",
            "unit": "Grande",
            "price": 25.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "21",
            "name": "Limão",
            "unit": "Dúzia",
            "price": 5.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "22",
            "name": "Louro",
            "unit": "Maço",
            "price": 5.00,
            "category": "Temperos",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "23",
            "name": "Mamão Verde",
            "unit": "unidade",
            "price": 3.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "24",
            "name": "Maracujá Doce",
            "unit": "3 por",
            "price": 6.00,
            "category": "Frutas",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "25",
            "name": "Repolho",
            "unit": "unidade",
            "price": 4.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "26",
            "name": "Rúcula",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        },
        {
            "id": "27",
            "name": "Salca",
            "unit": "Maço",
            "price": 3.00,
            "category": "Verduras",
            "enable": true,
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=158&strip=info&w=146"
        }
    ];

    categories = [];

    basket: { id: number, name: string, unit: string, price: number, qty: number }[];

    getCategories() {
        this.products.forEach(product => {
            product.qty = 0;
            if (!this.categories.includes(product.category))
                this.categories.push(product.category);
        });
    }


    constructor() {
        this.getCategories();
    }

}
export class StoryService {

    products = [
        {
            "name": "Abacate ",
            "unit": "unidade",
            "price": "3.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Acafrao",
            "unit": "200g",
            "price": "6.50",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Alface Americano",
            "unit": "Pé ",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Alface Crespa",
            "unit": "Pé ",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Alface Lisa",
            "unit": "Pé ",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Almeirão",
            "unit": "Pé ",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Babosa",
            "unit": "Folha",
            "price": "2.00",
            "category": "Especiais",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Banana",
            "unit": "Quilo",
            "price": "5.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Beterraba",
            "unit": "Maço",
            "price": "4.50",
            "category": "Legumes",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Bucha Vegetal",
            "unit": "Pedaço",
            "price": "5.00",
            "category": "Especiais",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Cebolinha",
            "unit": "Maço",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Cenoura",
            "unit": "Maço",
            "price": "4.50",
            "category": "Legumes",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Coentro Comum",
            "unit": "Maço",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Colorau ",
            "unit": "100g",
            "price": "5.00",
            "category": "Temperos",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Couve",
            "unit": "Maço",
            "price": "3.50",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Escarola",
            "unit": "Pé ",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Espinafre",
            "unit": "Maço",
            "price": "3.50",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Jaca",
            "unit": "Pequena",
            "price": "12.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Jaca",
            "unit": "Média ",
            "price": "17.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Jaca",
            "unit": "Grande",
            "price": "25.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Limão",
            "unit": "Dúzia",
            "price": "5.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Louro",
            "unit": "Maço",
            "price": "5.00",
            "category": "Temperos",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Mamão Verde",
            "unit": "unidade",
            "price": "3.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Maracujá Doce",
            "unit": "3 por",
            "price": "6.00",
            "category": "Frutas",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Repolho",
            "unit": "unidade",
            "price": "4.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Rúcula",
            "unit": "Maço",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        },
        {
            "name": "Salca",
            "unit": "Maço",
            "price": "3.00",
            "category": "Verduras",
            "enable": "true",
            "img": "https://saude.abril.com.br/wp-content/uploads/2017/07/abacate3.jpg?quality=85&strip=info&w=680"
        }
    ];

    categories = [];

    getCategories(){
        this.products.forEach(product => {
            if (!this.categories.includes(product.category))
                this.categories.push(product.category);
        });
    }

    constructor () {
        this.getCategories();
    }

}
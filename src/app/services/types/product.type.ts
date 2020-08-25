import { ItemType } from './item.type'
import { ItemCategoryType } from './item.category.type'

export class ProductType {
    _id: string;
    name: string;
    description?: string;
    unit: string;
    price: number;
    category: string;
    enable: boolean;
    img?: string;
    qty?: number;
    maxQty?: number;
    items: ItemCategoryType [];
    changed: boolean = false;
    constructor(){
        this.qty = 0;
    }
}
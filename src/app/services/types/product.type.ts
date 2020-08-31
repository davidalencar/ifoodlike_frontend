import { ItemType } from './item.type'
import { ItemCategoryType } from './item.category.type'
import { RegisterInterface } from '../interfaces/register.interface';

export class ProductType implements RegisterInterface {
    _id?: string;
    store: string;
    name: string;
    description?: string;
    unit?: string;
    price: number;
    cost?: number;
    vend?: string;
    category: string;
    enable: boolean;
    img?: string;
    qty?: number = 0;
    maxQty?: number;
    items: ItemCategoryType [];
    changed: boolean = false;
}
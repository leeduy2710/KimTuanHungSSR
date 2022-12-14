import Products from '../../models/product';

export interface CartItemOption {
    optionId: number;
    optionTitle: string;
    valueId: number;
    valueTitle: string;
}

export interface CartItem {
    id: number
    product: Products;
    options: CartItemOption[];
    price: number;
    quantity: number;
    total: number;
}

export type CartTotalType = 'shipping' | 'tax';

export interface CartTotal {
    type: CartTotalType;
    title: string;
    price: number;
}

export interface Cart {
    items: CartItem[];
    quantity: number;
    subtotal: number;
    totals: CartTotal[];
    total: number;
}

export interface CartState extends Cart {
    lastItemId: number;
}

// application
import { AppAction } from '../types';
// import { IProduct } from '../../interfaces/product';
import Product from '../../models/product';

export const QUICKVIEW_OPEN = 'QUICKVIEW_OPEN';
export const QUICKVIEW_CLOSE = 'QUICKVIEW_CLOSE';

export interface QuickviewOpenAction {
    type: typeof QUICKVIEW_OPEN;
    product: Product;
    // product: IProduct;
}

export interface QuickviewCloseAction {
    type: typeof QUICKVIEW_CLOSE;
}

export type QuickviewAction =
    QuickviewOpenAction |
    QuickviewCloseAction;

export type QuickviewThunkAction<T = void> = AppAction<QuickviewAction, T>;

// third-party
import { HYDRATE } from 'next-redux-wrapper';
// application
import { AppAction } from '../types';
import { IFilterValues, IListOptions } from '../../interfaces/list';
// import { IProductsList } from '../../interfaces/product';
import { IShopCategory } from '../../interfaces/category';
import { SHOP_NAMESPACE, ShopState } from './shopTypes';
import Product from '../../models/product';
import { IFilter } from '../../interfaces/filter';

export const SHOP_HYDRATE = HYDRATE;
export const SHOP_INIT = 'SHOP_INIT';
export const SHOP_FETCH_CATEGORY_SUCCESS = 'SHOP_FETCH_CATEGORY_SUCCESS';
export const SHOP_FETCH_PRODUCTS_LIST_START = 'SHOP_FETCH_PRODUCTS_LIST_START';
export const SHOP_FETCH_PRODUCTS_LIST_SUCCESS = 'SHOP_FETCH_PRODUCTS_LIST_SUCCESS';
export const SHOP_SET_OPTION_VALUE = 'SHOP_SET_OPTION_VALUE';
export const SHOP_SET_FILTER_VALUE = 'SHOP_SET_FILTER_VALUE';
export const SHOP_RESET_FILTERS = 'SHOP_RESET_FILTERS';

export interface ShopHydrateAction {
    type: typeof SHOP_HYDRATE;
    payload: {
        [SHOP_NAMESPACE]: ShopState;
    };
}

export interface ShopInitAction {
    type: typeof SHOP_INIT;
    categorySlug: string | null;
    options: IListOptions;
    filters: IFilterValues;
    listFiltersName: IFilter[];
}

export interface ShopFetchCategorySuccessAction {
    type: typeof SHOP_FETCH_CATEGORY_SUCCESS;
    category: IShopCategory | null;
}

export interface ShopFetchProductsListStartAction {
    type: typeof SHOP_FETCH_PRODUCTS_LIST_START;
}

export interface ShopFetchProductsListSuccessAction {
    type: typeof SHOP_FETCH_PRODUCTS_LIST_SUCCESS;
    productsList: Product[];
}

export interface ShopSetOptionValueAction {
    type: typeof SHOP_SET_OPTION_VALUE;
    option: string;
    value: string;
}

export interface ShopSetFilterValueAction {
    type: typeof SHOP_SET_FILTER_VALUE;
    filter: string;
    value: string | null;
}

export interface ShopResetFiltersAction {
    type: typeof SHOP_RESET_FILTERS;
}

export type ShopAction =
    ShopHydrateAction |
    ShopInitAction |
    ShopFetchCategorySuccessAction |
    ShopFetchProductsListStartAction |
    ShopFetchProductsListSuccessAction |
    ShopSetOptionValueAction |
    ShopSetFilterValueAction |
    ShopResetFiltersAction;

export type ShopThunkAction<T = void> = AppAction<ShopAction, T>;

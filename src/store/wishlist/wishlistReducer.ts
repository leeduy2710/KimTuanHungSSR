// application
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM, WishlistAction } from './wishlistActionTypes';
import { WishlistState } from './wishlistTypes';
import { withClientState } from '../client';
import Products from '../../models/product';

function addItem(state: WishlistState, product: Products): WishlistState {
    const itemIndex = state.items.findIndex((x) => x.product_id === product.product_id);

    if (itemIndex === -1) {
        return {
            items: [
                ...state.items,
                JSON.parse(JSON.stringify(product)),
            ],
        };
    }

    return state;
}

function removeItem(state: WishlistState, productId: number): WishlistState {
    return {
        items: state.items.filter((x) => x.product_id !== productId),
    };
}

const initialState: WishlistState = {
    items: [],
};

export const WISHLIST_NAMESPACE = 'wishlist';

function wishlistBaseReducer(state = initialState, action: WishlistAction) {
    switch (action.type) {
    case WISHLIST_ADD_ITEM:
        return addItem(state, action.product);

    case WISHLIST_REMOVE_ITEM:
        return removeItem(state, action.productId);

    default:
        return state;
    }
}

const wishlistReducer = withClientState(wishlistBaseReducer, WISHLIST_NAMESPACE);

export default wishlistReducer;

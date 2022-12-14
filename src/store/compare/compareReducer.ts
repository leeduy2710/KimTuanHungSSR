// application
import { COMPARE_ADD_ITEM, COMPARE_REMOVE_ITEM, CompareAction } from './compareActionTypes';
import { CompareState } from './compareTypes';
import { withClientState } from '../client';
import Products from '../../models/product';

function addItem(state: CompareState, product: Products): CompareState {
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

function removeItem(state: CompareState, productId: number): CompareState {
    return {
        items: state.items.filter((x) => x.product_id !== productId),
    };
}

const initialState: CompareState = {
    items: [],
};

export const COMPARE_NAMESPACE = 'compare';

function compareBaseReducer(state = initialState, action: CompareAction) {
    switch (action.type) {
    case COMPARE_ADD_ITEM:
        return addItem(state, action.product);

    case COMPARE_REMOVE_ITEM:
        return removeItem(state, action.productId);

    default:
        return state;
    }
}

const compareReducer = withClientState(compareBaseReducer, COMPARE_NAMESPACE);

export default compareReducer;

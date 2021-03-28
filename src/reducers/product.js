import { ACTION_TYPES } from "../actions/product";

const initialState = {
    productlist: [],
    groupedList: []
}

export const Product = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_PRODUCT:
            return {
                ...state,
                productlist: [...action.payload]
            }
        case ACTION_TYPES.FETCH_ALL_GROUPED:
            return {
                ...state,
                groupedList: [...action.payload]
            }
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                productlist: state.productlist.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                productlist: [...state.productlist, action.payload]
            }
        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                productlist: state.productlist.map(x => x.id === action.payload.id ? action.payload : x)
            }

        default:
            return state;
    }
}
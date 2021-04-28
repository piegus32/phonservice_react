import { ACTION_TYPES } from "../actions/product";

const initialState = {
    productList: [],
    groupedList: []
}

export const Product = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_PRODUCT:
            return {
                ...state,
                productList: [...action.payload]
            }
        case ACTION_TYPES.FETCH_ALL_GROUPED:
            return {
                ...state,
                groupedList: [...action.payload]
            }
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                productList: state.productList.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                productList: [...state.productList, action.payload]
            }
        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                productList: state.productList.map(x => x.id === action.payload.id ? action.payload : x)
            }

        default:
            return state;
    }
}
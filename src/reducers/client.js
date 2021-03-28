import { ACTION_TYPES } from "../actions/client";

const initialState = {
    clientlist: []
}

export const Client = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_CLIENTS:
            return {
                ...state,
                clientlist: [...action.payload]
            }
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                clientlist: state.clientlist.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                clientlist: [...state.clientlist, action.payload]
            }
        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                clientlist: state.clientlist.map(x => x.id === action.payload.id ? action.payload : x )
            }

        default:
            return state;
    }
}
import { ACTION_TYPES } from "../actions/repair";
const initialState = {
    repairData: [],
}
export const Repair = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_TODO:
            return {
                ...state,
                repairData: [...action.payload]
            }
        case ACTION_TYPES.FETCH_COMPLETE:
            return {
                ...state,
                repairData: [...action.payload]
            }
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                repairData: state.repairData.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                repairData: [...state.repairData, action.payload]
            }
        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                repairData: state.repairData.map(x => x.id === action.payload.id ? action.payload : x)
            }

        default:
            return state;
    }
}
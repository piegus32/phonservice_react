import { ACTION_TYPES } from "../actions/auth";

const initialState = {
  user: [],
  isLoggedIn: false
}

export const Auth = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN:
            return{
              isLoggedIn: true,
              user: action.payload,
            }
        default:
            return state;
    }
}
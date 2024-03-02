import { AuthActionTypes } from "../actions/auth-actions";
import {ActionWithPayload} from "../utils/redux";

export interface AuthState {
  isAuthenticated: boolean;
}

export default function authReducer(state: AuthState, action: ActionWithPayload) {
    switch (action.type){
        case AuthActionTypes.LOGIN:
            return {...state, user:{isAuthenticated: action.payload.isAuthenticated}}

        default:
            return state;
    }
}


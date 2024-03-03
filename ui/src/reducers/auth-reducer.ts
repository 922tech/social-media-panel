import { AuthState } from ".";
import { AuthActionTypes, AuthActions } from "../actions/auth-actions";
import {ActionWithPayload} from "../utils/redux";




const initailAuthState : AuthState = {
    user: {
        isAuthenticated: false,
        
    },
}
export default function authReducer(state: AuthState, action: AuthActions) : AuthState {
    switch (action.type){
        case AuthActionTypes.LOGIN:
            return {...state, user: { isAuthenticated: false}}
        default:
            return initailAuthState;
    }
}


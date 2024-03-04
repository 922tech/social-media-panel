import { AuthState } from ".";
import { AuthActionTypes, AuthActions } from "../actions/auth-actions";

const initailAuthState : AuthState = {
    user: {
        isAuthenticated: false,
    },
    login: null,
    loginSuccess: false
}

export default function authReducer(state: AuthState, action: AuthActions) : AuthState {
    switch (action.type){
        case AuthActionTypes.LOGIN:
            return { user: { isAuthenticated: false}, login: true, loginSuccess: false }

        case AuthActionTypes.LOGIN_SUCCESS:
            return { user: { isAuthenticated: true}, login: true, loginSuccess: true }
        default:
            return initailAuthState;
    }
}


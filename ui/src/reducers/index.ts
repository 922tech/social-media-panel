import { combineReducers, Reducer } from 'redux';
import authReducer from "./auth-reducer";

export interface AuthState {
    user: {
        isAuthenticated: boolean,
    },
    login: any,
    loginSuccess: boolean
}


export interface CombinedState {
    auth: AuthState;
}


export default function createRootReducer(): any {
    return combineReducers({
        auth: authReducer,
    })
}

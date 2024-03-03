import { combineReducers, Reducer } from 'redux';
import authReducer from "./auth-reducer";

export interface CombinedState {
    auth?: AuthState;
}

export interface AuthState {
    user: {
        isAuthenticated: boolean,
        
    },
}

export default function createRootReducer(): any {
    return combineReducers({
        auth: authReducer,
    })
}

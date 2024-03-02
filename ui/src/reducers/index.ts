import { combineReducers, Reducer } from 'redux';
import authReducer, {AuthState} from "./auth-reducer";

export interface CombinedState {
    auth: AuthState;
}
export default function createRootReducer(): Reducer {
    return combineReducers({
        auth: authReducer,
    })
}

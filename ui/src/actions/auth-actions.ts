import {ThunkAction} from "../utils/redux";


export enum AuthActionTypes {
    IS_AUTHENTICATED = "IS_AUTHENTICATED",
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOG_SUCCESS"
}

const login = (credential: string, password: string) : ThunkAction => async (dispatch) => {
    dispatch({
        type: AuthActionTypes.LOGIN,
        payload: {isAuthenticated: true}
    })
}
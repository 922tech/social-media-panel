import {ActionUnion, ThunkAction, createAction} from "../utils/redux";


export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS"
}

const authActions = {
    login: () => createAction(AuthActionTypes.LOGIN),
    loginSuccess: (user: any) => createAction(AuthActionTypes.LOGIN_SUCCESS, { user })
}

export type AuthActions = ActionUnion<typeof authActions>;


const login = (credential: string, password: string) : ThunkAction => async (dispatch) => {
    dispatch(authActions.login())
}

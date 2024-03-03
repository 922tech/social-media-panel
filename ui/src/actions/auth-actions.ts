import {ActionUnion, ThunkAction, createAction} from "../utils/redux";
import serverProxy from "../core/server";

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS"
}

const authActions = {
    login: () => createAction(AuthActionTypes.LOGIN),
    loginSuccess: (user: any) => createAction(AuthActionTypes.LOGIN_SUCCESS, { user })
}

export type AuthActions = ActionUnion<typeof authActions>;


export const loginAsync = (credential: string, password: string) : ThunkAction => async (dispatch, getState) => {
    await serverProxy.server.login(credential, password)
    dispatch(authActions.login())
}

export const loginSuccessAsync = () : ThunkAction => async (dispatch) => {
    const user = await serverProxy.server.getProfile()
    dispatch(authActions.loginSuccess(user))
}
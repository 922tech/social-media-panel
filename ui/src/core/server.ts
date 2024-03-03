import Axios, { AxiosError, AxiosResponse } from 'axios';
import config from '../config';
import { User } from './models';
const store = require('store')

let access_token = store.get('access_token');
let refresh_token = store.get('refresh_token');


function setAuthData(response: AxiosResponse): void {
    if (response.data.key) {
        access_token = response.data.access_token;
        refresh_token = response.data.access_token;
        store.set('token', access_token);
        store.set('token', refresh_token);
        Axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    }
}

function removeAuthData(): void {
    Axios.defaults.headers.common.Authorization = '';
    store.remove('token');
    access_token = null;
    refresh_token = null;
}

async function login(credential: string, password: string): Promise<void> {
    removeAuthData();
    let authenticationResponse = null;
    try {
        authenticationResponse = await Axios.post(`${config.backendAPI}/auth/login`, {
            username: credential,
            password,
        });
    } catch (errorData) {
        throw Error('Your credentials is not valid.');
    }
    setAuthData(authenticationResponse);
}

async function fresh_token() {
    const fresh_token_response = await Axios.post(`${config.backendAPI}/auth/login`, {
        refresh: refresh_token
    });
    setAuthData(fresh_token_response);
}

async function getProfile(){
    const profileData = await Axios.get(`${config.backendAPI}/auth/login`);
    return new User(profileData.data)
}

const serverProxy = Object.freeze({
    server: Object.freeze({
        setAuthData,
        removeAuthData,
        login,
        fresh_token,
        getProfile
    }),
});

export default serverProxy;
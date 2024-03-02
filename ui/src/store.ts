import { ThunkMiddleware, thunk } from 'redux-thunk';
import { createStore, applyMiddleware, Store, Reducer } from 'redux';
import { createLogger } from 'redux-logger';
import { isDev } from './utils/environment';
import {configureStore} from '@reduxjs/toolkit';
const logger = createLogger({
    predicate: isDev,
    collapsed: true,
});

let store: Store | null = null;

export default function createStoreStore(createRootReducer: () => Reducer): void {
    let appliedMiddlewares= [applyMiddleware(logger), thunk]
    if (isDev()) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const { composeWithDevTools } = require('redux-devtools-extension');
        appliedMiddlewares = composeWithDevTools(appliedMiddlewares);
    }
    store = configureStore({reducer:createRootReducer()});
}

export function getProjectStore(): Store {
    if (store) {
        return store;
    }

    throw new Error('First create a store');
}
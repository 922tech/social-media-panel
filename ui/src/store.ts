import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, Store, Reducer } from 'redux';
import { createLogger } from 'redux-logger';
import { isDev } from './utils/environment';

const logger = createLogger({
    predicate: isDev,
    collapsed: true,
});

let store: Store | null = null;

export default function createCVATStore(createRootReducer: () => Reducer): void {
    let appliedMiddlewares= [applyMiddleware(logger), thunkMiddleware]
    if (isDev()) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
        const { composeWithDevTools } = require('redux-devtools-extension');
        appliedMiddlewares = composeWithDevTools(appliedMiddlewares);
    }
    store = createStore(createRootReducer(), appliedMiddlewares);
}

export function getProjectStore(): Store {
    if (store) {
        return store;
    }

    throw new Error('First create a store');
}
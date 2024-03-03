import React from 'react';
import { Provider } from 'react-redux';
import createStoreStore, {getProjectStore} from './store'
import ReactDOM from 'react-dom/client';
import App from './components/App';
import createRootReducer from "./reducers";
import { BrowserRouter } from 'react-router-dom';

createStoreStore(createRootReducer)

const store = getProjectStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    
      <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);


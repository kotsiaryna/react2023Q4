import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routesConfig from './routerConfig';

import './index.scss';
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter(routesConfig);

const root = document.getElementById('root');
if (!root) throw new Error('no root element');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

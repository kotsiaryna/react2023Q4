import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ControlledForm from './view/pages/Controlled';
import UncontrolledForm from './view/pages/Uncontrolled';
import store from './redux/store';
import { Provider } from 'react-redux';
import Navbar from './view/pages/Navbar';
import Home from './view/pages/Home';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'uncontrolled',
        element: <UncontrolledForm />,
      },
      {
        path: 'controlled',
        element: <ControlledForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

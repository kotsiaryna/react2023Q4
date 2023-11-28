import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './view/pages/Home';
import ControlledForm from './view/pages/Controlled';
import UncontrolledForm from './view/pages/Uncontrolles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './view/App';
import Results from './view/results/Results';
import Page404 from './view/notFound/Page404';
import ArticleDetails from './view/results/ArticleDetails';
import ErrorPage from './view/error/ErrorPage';

import { articleRequest } from './api';

import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path=":search/:page" element={<Results />}>
        <Route path=":id" element={<ArticleDetails />} loader={articleRequest} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

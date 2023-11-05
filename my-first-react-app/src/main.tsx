import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './view/App';
import './index.scss';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Results from './view/results/Results';
import { articleRequest } from './api';
import Page404 from './view/notFound/Page404';
import ErrorBoundary from './view/ErrorBoundary';
import ArticleDetails from './view/results/ArticleDetails';
import ErrorPage from './view/error/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    // TODO errorElements for different errors
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
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
